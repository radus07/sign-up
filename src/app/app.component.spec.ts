import { AppComponent } from '@app/app.component';
import { MockService } from 'ng-mocks';
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
  let translateService: TranslateService;
  let component: AppComponent;

  beforeEach(() => {
    translateService = MockService(TranslateService);
    component = new AppComponent(translateService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
