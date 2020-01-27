import { Component, OnInit } from '@angular/core';
//import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { Entry } from 'contentful';
import { CONTENT_CONFIG } from 'src/app/global-config';
import { Router } from '@angular/router';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';

@Component({
  selector: 'technews',
  templateUrl: './tech-news.component.html',
  styleUrls: ['./tech-news.component.css']
})
export class TechNewsComponent implements OnInit {
  private techNews: Entry<any>[] = [];

  constructor(private router: Router, private contentfulService: ContentfulrapperService) { 
    console.log("ContentFul Constructor !!!!!");
  }

  ngOnInit() {
    console.log("ContentFul Constructor !!!!!1");
    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.techNewsQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(techNews => this.techNews = techNews)
  }


  // gotoContentDetails(contentId) {
  //   this.router.navigate(['technewsdetails', contentId]);
  // }

}
