import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.restServerUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // API url
  private getColorURL = API_URL + '/getColorTags';
  // baseApiUrl = "http://10.1.72.121:8081/getColorTags"

  constructor(private http: HttpClient) { }

  upload(file:any, groupNum:string): Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    formData.append("groupNum", groupNum);

    // Make http post request over api
    // with formData as req
    return this.http.post(this.getColorURL, formData)
  }

}
