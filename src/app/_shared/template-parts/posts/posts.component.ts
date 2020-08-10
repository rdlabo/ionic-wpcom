import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subject, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

// import {formatNumber} from "@angular/common";
import {Router} from '@angular/router';
import { IPost, IPostParams, IStragePost } from '../../../../interfaces/wordpress';
import { WordpressProvider } from '../../../../providers/wordpress/wordpress';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [WordpressProvider],
})
export class PostsComponent implements OnChanges, OnInit, OnDestroy {
  @Input() public search: IPostParams;
  public page = 1;
  public posts: Array<IPost> = [];
  public subject;
  public Loaded: boolean;
  public timerSubscription: Subscription;

  public ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log('ngOnChanges');
    this.Loaded = false;
    if (this.search.type !== 'wait') {
      this.subject.next();
    }
  }

  constructor(
    public navCtrl: NavController,
    public wp: WordpressProvider,
    public router: Router,
    public storage: Storage) {
    this.initializeSubject();
  }

  public ngOnInit() {
    // 定期実行
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      this.storage.get('hidden').then((data) => {
        if (data) {
          const hiddens: Array<IStragePost> = JSON.parse(data);
          console.log(hiddens);
          this.posts = this.posts.filter((v) => {
            let flg = true;
            Array.prototype.forEach.call(hiddens, (node) => {
              if (node.domain === environment.wordpressURL && v.ID === node.article.ID) {
                flg = false;
              }
            });
            return flg;
          });
        }
      });
    });
  }

  public ngOnDestroy() {
    if (this.subject) {
      this.subject.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  public doInfinite(infiniteScroll) {
     this.getPostList().then((data: Array<IPost>) => {
        this.page++;
        this.posts = this.posts.concat(data);
        if (data.length > 0) {
          console.log('infiniteScroll', infiniteScroll);
          infiniteScroll.target.complete();
        } else {
          infiniteScroll.target.enable(false);
        }
      },
      (error) => {
        infiniteScroll.target.complete();
      },
    );
  }

  public viewSingle(post): void {
    this.router.navigateByUrl(`/archive/single/${post.ID}`);
  }

  private initializeSubject() {
    this.subject = new Subject();
    this.subject
      .pipe(
        switchMap((obj) => {
          return this.getPostList();
        }),
      )
      .subscribe((data: Array<IPost>) => {
        this.page = 2;
        this.posts = data;
      });
  }

  private getPostList() {
    return new Promise((resolve, reject) => {
      this.wp.getPostList(this.page, this.search).subscribe(
        (data) => {
          this.Loaded = true;
          resolve(data);
        },
        (error) => {
          this.Loaded = true;
          reject(error);
        },
      );
    });
  }
}
