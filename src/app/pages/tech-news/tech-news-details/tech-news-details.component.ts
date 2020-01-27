import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { Entry } from 'contentful';
import { CONTENT_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'technewsdetails',
  templateUrl: './tech-news-details.component.html',
  styleUrls: ['./tech-news-details.component.css']
})
export class TechNewsDetailsComponent implements OnInit {

  id: any;
  private techNewsDetails: Entry<any>[] = [];
  constructor(private _activeRoute: ActivatedRoute, private contentfulService: ContentfulrapperService) { }

  ngOnInit() {
    this._activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("Key Value :::::::: "+this.id);
    });

    this.contentfulService.getAllContentByID(CONTENT_CONFIG.PageBlockSectionFieldsDetailsFields,this.id,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(techNewsDetails => this.techNewsDetails = techNewsDetails)


  }

}
