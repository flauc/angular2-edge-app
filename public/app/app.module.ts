import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {SharedModule} from './shared.module';
import {routing, appRoutingProviders, appRoutingComponents} from './routes.config';
import {ChatSortPipe} from './pages/dashboard/chat/chat-sort.pipe';
import {ChatComponent} from './pages/dashboard/chat/chat.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        SharedModule,
        routing
    ],
    providers: [
        appRoutingProviders,
    ],
    declarations: [
        AppComponent,
        ChatComponent,
        ChatSortPipe,
        appRoutingComponents
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }