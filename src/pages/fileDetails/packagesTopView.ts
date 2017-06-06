import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'packages-top-view',
  styles: [`
.packages-top-view{
    display: flex;
    background-color: #3f6184;
    color: #fdfdfd;
}

.packages-top-view .package-item{
    width: 23%;
    margin-right: 2%;
    padding: 2%;
    position: relative;
}

.packages-top-view .package-item .title{
    padding-bottom: 10%;
    font-size: small;
}
.packages-top-view .package-item .desc{
    font-size: small;
}

.packages-top-view .package-item .title,.desc{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.package-item:first-child:before {
    display: none; }

.package-item:before {
    content: '';
    display: block;
    position: absolute;
    height: 70%;
    width: 1px;
    background-color: #ececec;
    left: -5%;
    top: 15%;
}
`],
  template: `
<div class="packages-top-view">
    <span class="package-item">
        <div class="title">Packages</div>
        <div class="desc regular-font">{{packages || '-'}}</div>
    </span>
    <span class="package-item">
        <div class="title">Weight</div>
        <div class="desc regular-font">{{weight || '-'}} {{weight?'Kg':''}}</div>
    </span>
    <span class="package-item">
        <div class="title">Volume</div>
        <div class="desc regular-font">{{volume || '-'}} {{volume?'Cbm':''}}</div>
    </span>
    <span class="package-item">
        <div class="title">Goods</div>
        <div class="desc regular-font">{{goods || '-'}}</div>
    </span>
</div>
`})
export class PackagesTopView{

  @Input() goods: string;
  @Input() volume: string;
  @Input() weight: string;
  @Input() packages: string;

}
