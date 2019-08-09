import { HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GithubProfileService extends DataService {

  constructor(http: HttpClient) {
    super('https://api.github.com/users', http);
  }
}
