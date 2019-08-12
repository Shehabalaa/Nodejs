import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PostCreateComponent } from './post/post-create/post-create.component';
import { PostListComponent } from './post/post-list/post-list.component';

const routes = [
    {path:'create', component:PostCreateComponent},
    {path:'edit/:postId', component:PostCreateComponent},
    {path:'', component:PostListComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {

}