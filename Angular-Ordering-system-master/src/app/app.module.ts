import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { UsersListComponent } from './users-list/users-list.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupsListComponent } from './groups/groups-list/groups-list.component';
import { GroupItemComponent } from './groups/groups-list/group-item.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { UserItemComponent } from './users-list/user-item/user-item.component';

import { ApiRouterService } from './api-router.service';
import { LocalstorageService } from './localstorage.service';
import { FriendsComponent } from './friends/friends.component';
import { NewGroupUsersService } from './new-group-users.service';
import { HomeComponent } from './home/home.component';
import { LastOrdersListComponent } from './home/last-orders-list/last-orders-list.component';
import { ActivitiesListComponent } from './home/activities-list/activities-list.component';
import { LastOrderComponent } from './home/last-orders-list/last-order/last-order.component';
import { ActivityComponent } from './home/activities-list/activity/activity.component';
import { OrdersComponent } from './orders/orders.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { FileToBase64Service } from './file-to-base64.service';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { MealsListComponent } from './orders/order-details/meals-list/meals-list.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HeaderComponent } from './header/header.component';
import { NotificationsAllComponent } from './notifications-all/notifications-all.component';
import { ModalComponent } from './modal/modal.component';
import { MainAppGuard } from './main-app.guard';
import { AuthGuard } from './auth.guard';
const appRoutes: Routes = [
  { 'path':'home', component: HomeComponent, canActivate:[MainAppGuard] },
  { 'path':'login', component: LoginComponent, canActivate:[AuthGuard] },
  { 'path':'registration', component: RegisterationComponent, canActivate:[AuthGuard] },
  { 'path':'groups', component: GroupsComponent, canActivate:[MainAppGuard] },
  { 'path':'friends', component: FriendsComponent, canActivate:[MainAppGuard] },
  { 'path':'orders/add', component: AddOrderComponent, canActivate:[MainAppGuard] },
  { 'path':'orders/details/:id', component: OrderDetailsComponent, canActivate:[MainAppGuard] },
  { 'path':'orders', component: OrdersComponent, canActivate:[MainAppGuard] },
  { 'path':'notifications', component: NotificationsComponent, canActivate:[MainAppGuard] },
  { 'path':'', redirectTo:'/login', pathMatch: "full" },
  { 'path':'**', redirectTo:'/login', pathMatch: "full" }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterationComponent,
    UsersListComponent,
    GroupsComponent,
    GroupsListComponent,
    GroupItemComponent,
    GroupUsersComponent,
    UserItemComponent,
    FriendsComponent,
    OrdersComponent,
    AddOrderComponent,
    HomeComponent,
    LastOrdersListComponent,
    ActivitiesListComponent,
    LastOrderComponent,
    ActivityComponent,
    OrderDetailsComponent,
    MealsListComponent,
    NotificationsComponent,
    HeaderComponent,
    NotificationsAllComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ ApiRouterService, LocalstorageService , NewGroupUsersService, FileToBase64Service, MainAppGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
