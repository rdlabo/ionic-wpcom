import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import {FooterComponent} from './footer/footer.component'
//import { BookmarkPostsComponent } from './template-parts/bookmark-posts/posts';
import {PostsComponent} from './template-parts/posts/posts.component'
//import { SidebarComponent } from './template-parts/sidebar/sidebar';
//import { HeaderComponent } from './header/header';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    FooterComponent,
    PostsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
  ],
  exports:[
    FooterComponent,
    PostsComponent
  ]
})
export class SharedModule { }
