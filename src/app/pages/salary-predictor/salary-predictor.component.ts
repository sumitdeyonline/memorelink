import { Component, OnInit } from '@angular/core';
import { Entry } from 'contentful';
import { ContentfulrapperService } from 'src/app/services/contentful/contentfulrapper.service';
import { CONTENT_CONFIG } from 'src/app/global-config';

@Component({
  selector: 'salarypredictor',
  templateUrl: './salary-predictor.component.html',
  styleUrls: ['./salary-predictor.component.css']
})
export class SalaryPredictorComponent implements OnInit {
  private salaryPredictor: Entry<any>[] = [];
  constructor(private contentfulService: ContentfulrapperService) { }

  ngOnInit() {
    this.contentfulService.getAllContent(CONTENT_CONFIG.PageBlockSectionFields,CONTENT_CONFIG.salaryPredictorQueryString,CONTENT_CONFIG.contentTypeIds.PageBlockSection)
    .then(salaryPredictor => this.salaryPredictor = salaryPredictor);        
  }

}
