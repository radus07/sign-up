import { ChangeDetectionStrategy, Component } from '@angular/core';
import en from '@translations/en.json';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private readonly translateService: TranslateService) {
    translateService.setTranslation(environment.defaultLanguage, en);
    translateService.setDefaultLang(environment.defaultLanguage);
  }
}
