/**
 * During the ptototype phase propery IDs may change. This file provides a
 * universal reference to property IDs which are used throughout the app and
 * avoids the need to update separate instances on changes to the source data.
 */
export const MODEL: StringMap = {
  title: 'title',
  description: 'description',
  tasks: 'tasks',
  isEnabled: 'isEnabled',
  company: 'company',
  year: 'year',
  projectType: 'projectType',
  projectSkills: 'projectSkills',
  imgThumbLoc: 'imgThumbLoc',
  imgPreviewLoc: 'imgPreviewLoc',
  videoPreviewLoc: 'videoPreviewLoc',
  urlPreview: 'urlPreview',
  urlPrototype: 'urlPrototype',
  urlCode: 'urlCode',
  urlMocks: 'urlMocks',
  urlWireframes: 'urlWireframes',
  urlScreencast: 'urlScreencast',
}

export interface StringMap { [s: string]: string; }
