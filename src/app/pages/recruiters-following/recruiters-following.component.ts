import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { CONTENT_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'recruitersfollowing',
  templateUrl: './recruiters-following.component.html',
  styleUrls: ['./recruiters-following.component.css']
})
export class RecruitersFollowingComponent implements OnInit {
  private recruiterfollowing: Entry<any>[] = [];
  constructor(private contentfulService: ContentfulrapperService) { }

  ngOnInit() {
    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.recruiterFollowingsQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(recruiterfollowing => this.recruiterfollowing = recruiterfollowing);      
  }

}
