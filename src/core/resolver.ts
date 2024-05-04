export const AntdLibraryResolver = () => {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (AntdLibraries.includes(name)) {
        return {
          name: name,
          from: `@antd-templater/library-3.x`,
        }
      }
    },
  } as const
}

export const AntdLibraries = [
  // S-Form
  'formValidator',
  'formGridDefiner',
  'formRulesDefiner',
  'formGroupsDefiner',

  // S-Table
  'tableScrollDefiner',
  'tableStickyDefiner',
  'tableSourcesDefiner',
  'tableSummarysDefiner',
  'tableColumnsDefiner',
  'tablePaginateDefiner',
  'tableLoadDataDefiner',
  'tableResponserDefiner',
  'tableEmitSorterDefiner',
  'tableEmitSelectDefiner',
  'tableEmitExpandDefiner',
  'tableEmitPageChangeDefiner',
  'tableEmitPageSizeChangeDefiner',
  'tableCustomHeaderRowAttrsDefiner',
  'tableCustomBodyerRowAttrsDefiner',
  'tableCustomFooterRowAttrsDefiner',
  'tableCustomBodyerRowStatesDefiner',
  'tableCustomHeaderCellRenderDefiner',
  'tableCustomBodyerCellRenderDefiner',
  'tableCustomFooterCellRenderDefiner',

  // S-Tree
  'treeDataDefiner',
  'treeLoadDataDefiner',
  'treeEmitCheckDefiner',
  'treeEmitSelectDefiner',
  'treeEmitExpandDefiner',
  'treeEmitChangeDefiner',
  'treeDropHandlerDefiner',
  'treeReplaceFieldsDefiner',
]
