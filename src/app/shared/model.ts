/**
 * During the ptototype phase propery IDs may change. This file provides a
 * universal reference to property IDs which are used throughout the app and
 * avoids the need to update separate instances on changes to the source data.
 */
export const MODEL: StringMap = {
  title: 'title',
  description: 'description',
  isEnabled: 'isEnabled',
  company: 'company',
  year: 'year',
  projectType: 'projectType',
  projectSkills: 'projectSkills',
  imgThumbLoc: 'imgThumbLoc',
  imgPreviewLoc: 'imgPreviewLoc',
  urlCode: 'urlCode',
  urlMocks: 'urlMocks',
  urlPreview: 'urlPreview',
  urlScreencast: 'urlScreencast',
}

export interface StringMap { [s: string]: string; }
