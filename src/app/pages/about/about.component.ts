import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Entry } from 'contentful';
import { CONTENT_CONFIG } from 'src/app/global-config';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private aboutUS: Entry<any>[] = [];

  constructor(private auth: AuthService, private contentfulService: ContentfulrapperService) { }

  ngOnInit() {
    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.aboutQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(aboutUS => this.aboutUS = aboutUS);     
  }

}
