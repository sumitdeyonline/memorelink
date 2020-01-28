import { Injectable } from '@angular/core';
import { CONTENT_CONFIG } from 'src/app/global-config';
import { ContentfulService } from './contentful.service';

@Injectable({
  providedIn: 'root'
})
export class ContentfulrapperService extends ContentfulService{

  constructor() { 
    console.log("ContentfulrapperService @@@###$$%% ");
    //super(CONTENT_CONFIG.space, CONTENT_CONFIG.accessToken);  
    super();  
    console.log("ContentfulrapperService ########### ");
  }
}
