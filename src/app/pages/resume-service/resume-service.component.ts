import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { CONTENT_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'resumeservice',
  templateUrl: './resume-service.component.html',
  styleUrls: ['./resume-service.component.css']
})
export class ResumeServiceComponent implements OnInit {
  private resumeService: Entry<any>[] = [];
  constructor(private contentfulService: ContentfulrapperService) { }

  ngOnInit() {
    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.resumeserviceQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(resumeService => this.resumeService = resumeService);      
  }

}
