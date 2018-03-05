
export interface NumericDimensions {
  [name: string]: number;
}

export const PAGE_DIMENSIONS: NumericDimensions = {
  wPageMaxSm: 740,
  wPageMaxMd: 740,
  wPageMaxLg: 740,
}

const PORTFOLIO_ITEM_SPACER = 10;

export const UI_DIMENSIONS: NumericDimensions = {
  wPortfolioItemMaxSm:
    PAGE_DIMENSIONS.wPageMaxSm / 2 - PORTFOLIO_ITEM_SPACER / 2,
  wPortfolioItemMaxMd:
    PAGE_DIMENSIONS.wPageMaxMd / 3 - PORTFOLIO_ITEM_SPACER / 2,
  wPortfolioItemMaxLg:
    PAGE_DIMENSIONS.wPageMaxLg / 3 - PORTFOLIO_ITEM_SPACER / 2,
}
