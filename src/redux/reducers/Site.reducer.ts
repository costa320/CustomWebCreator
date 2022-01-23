import * as React from 'react';
/* MODELS */
import {
  Section_Autocertificazioni, Section_Messaggi,
} from '../models/Home';

const Site = (
  state: State = {
    Routes: [
      {
        id: 'home',
        path: '/',
        label: 'Home',
        state: {},
        exact: true
      },
    ],

    /* you may have multiple pages that will go to one route */
    Pages: {
      home: {
        routeId: 'home',
        rows: [
          {
            row_id: 0,
            hgutters: 8, /* [0, 2, 4, 8, 16, 24, 32, 40, 48] horizzontal */
            vgutters: 16, /* [0, 2, 4, 8, 16, 24, 32, 40, 48] vertical */
            justify: 'start', /* start | end | center | space-around | space-between */
            align: null, /* top | middle | bottom */
            cols: [
              {
                col_id: 0,
                row_id: 0,
                generalGrid: {
                  span: 24,
                  offset: null,
                  flex: null,
                  order: 1,
                },
                ComplexGridEnabled: false,
                complexGrid: {
                  xs: {
                    /* screen < 576px */
                    span: 6,
                    offset: null,
                    flex: null,
                    order: 1,
                  },
                  sm: {
                    /* screen ≥ 576px */
                    span: 6,
                    offset: null,
                    flex: null,
                    order: 1,
                  },
                  md: {
                    /* screen ≥ 768px */
                    span: 6,
                    offset: null,
                    flex: null,
                    order: 1,
                  },
                  lg: {
                    /* screen ≥ 992px */
                    span: 6,
                    offset: null,
                    flex: null,
                    order: 1,
                  },
                  xl: {
                    /* screen ≥ 1200px */
                    span: 6,
                    offset: null,
                    flex: null,
                    order: 1,
                  },
                  xxl: {
                    /* screen ≥ 1600px */
                    span: 6,
                    offset: null,
                    flex: null,
                    order: 1,
                  },
                },
                component: {
                  name: 'Table',
                  props: {
                    columns: [
                      {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                      },
                      {
                        title: 'Age',
                        dataIndex: 'age',
                        key: 'age',
                      },
                      {
                        title: 'Address',
                        dataIndex: 'address',
                        key: 'address',
                      },
                    ],
                    dataSource: [
                      {
                        key: '1',
                        name: 'Mike',
                        age: 32,
                        address: '10 Downing Street',
                      },
                      {
                        key: '2',
                        name: 'John',
                        age: 42,
                        address: '10 Downing Street',
                      }
                    ]
                  },
                  ApiEndpoint: ''
                }
              }
            ]
          }
        ]
      }
    },
    CurrentPage: {
      routeId: 'home',
      rows: [
        {
          row_id: 0,
          hgutters: 8, /* [0, 2, 4, 8, 16, 24, 32, 40, 48] horizzontal */
          vgutters: 16, /* [0, 2, 4, 8, 16, 24, 32, 40, 48] vertical */
          justify: 'start', /* start | end | center | space-around | space-between */
          align: null, /* top | middle | bottom */
          cols: [
            {
              col_id: 0,
              row_id: 0,
              generalGrid: {
                span: 24,
                offset: null,
                flex: null,
                order: 1,
              },
              ComplexGridEnabled: false,
              complexGrid: {
                xs: {
                  /* screen < 576px */
                  span: 6,
                  offset: null,
                  flex: null,
                  order: 1,
                },
                sm: {
                  /* screen ≥ 576px */
                  span: 6,
                  offset: null,
                  flex: null,
                  order: 1,
                },
                md: {
                  /* screen ≥ 768px */
                  span: 6,
                  offset: null,
                  flex: null,
                  order: 1,
                },
                lg: {
                  /* screen ≥ 992px */
                  span: 6,
                  offset: null,
                  flex: null,
                  order: 1,
                },
                xl: {
                  /* screen ≥ 1200px */
                  span: 6,
                  offset: null,
                  flex: null,
                  order: 1,
                },
                xxl: {
                  /* screen ≥ 1600px */
                  span: 6,
                  offset: null,
                  flex: null,
                  order: 1,
                },
              },
              component: {
                name: 'Table',
                props: {
                  columns: [
                    {
                      title: 'Name',
                      dataIndex: 'name',
                      key: 'name',
                    },
                    {
                      title: 'Age',
                      dataIndex: 'age',
                      key: 'age',
                    },
                    {
                      title: 'Address',
                      dataIndex: 'address',
                      key: 'address',
                    },
                  ],
                  dataSource: [
                    {
                      key: '1',
                      name: 'Mike',
                      age: 32,
                      address: '10 Downing Street',
                    },
                    {
                      key: '2',
                      name: 'John',
                      age: 42,
                      address: '10 Downing Street',
                    }
                  ]
                },
                ApiEndpoint: ''
              }
            }
          ]
        }
      ]
    }

  },
  action: Action
) => {
  let newOBJ: any = {}
  switch (action.type) {
    case "SET_DATI_REDUX":
      newOBJ = {
        ...state,
        ...action.payload,
      };
      state = {
        ...state,
        ...newOBJ,
      };
      break;
    case "SET_CurrentPage":
      newOBJ = {
        ...state.CurrentPage,
        ...action.payload,
      };
      state = {
        ...state,
        CurrentPage: newOBJ,
      };
      break;


  }
  return state;
};

export default Site;


/* INTERFACES */

interface State {
  Routes: any,
  Pages: any,
  CurrentPage: any
}

interface Action {
  type: string,
  payload: any
}
