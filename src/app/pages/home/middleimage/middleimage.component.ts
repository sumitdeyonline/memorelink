import { Component, OnInit } from '@angular/core';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { Entry } from 'contentful';
import { CONTENT_CONFIG } from 'src/app/global-config';


@Component({
  selector: 'middleimage',
  templateUrl: './middleimage.component.html',
  styleUrls: ['./middleimage.component.css']
})
export class MiddleimageComponent implements OnInit {
  private jobImage: Entry<any>[] = [];

  constructor(private contentfulService: ContentfulrapperService) { }

  ngOnInit() {
    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.imageQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(jobImage => this.jobImage = jobImage)        
  }

}
