import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
// import { SidebarComponent } from './template-parts/sidebar/sidebar';
// import { HeaderComponent } from './header/header';
import { PipesModule } from '../../pipes/pipes.module';
import {FooterComponent} from './footer/footer.component';
// import { BookmarkPostsComponent } from './template-parts/bookmark-posts/posts';
import {PostsComponent} from './template-parts/posts/posts.component';

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
  exports: [
    FooterComponent,
    PostsComponent,
  ],
})
export class SharedModule { }
