import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { CONTENT_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'recruiterssolution',
  templateUrl: './recruiters-solution.component.html',
  styleUrls: ['./recruiters-solution.component.css']
})
export class RecruitersSolutionComponent implements OnInit {
  private recruiters: Entry<any>[] = [];
  constructor(private contentfulService: ContentfulrapperService) { }

  ngOnInit() {
    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.recruitersQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(recruiters => this.recruiters = recruiters);    
  }

}
