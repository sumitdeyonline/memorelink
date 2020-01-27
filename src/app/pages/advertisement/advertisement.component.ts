import { Component, OnInit } from '@angular/core';
import { CONTENT_CONFIG } from 'src/app/global-config';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { Entry } from 'contentful';

@Component({
  selector: 'advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {
  private advertisement: Entry<any>[] = [];
  
  constructor(private contentfulService: ContentfulrapperService) { }

  ngOnInit() {
    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.advertiseQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(advertisement => this.advertisement = advertisement)      
  }

}
