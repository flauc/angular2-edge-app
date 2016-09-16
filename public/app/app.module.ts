import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {SharedModule} from './shared.module';
import {routing, appRoutingProviders, appRoutingComponents} from './routes.config';

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
        appRoutingComponents
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }