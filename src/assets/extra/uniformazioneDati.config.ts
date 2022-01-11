export function getConfigUniformazioneDati(): any {
  return {
    DatiAzienda: {
      campi: [
        {
          input: "MatricolaInps",
          output: "matricolaINPS",
        },
        {
          input: "CodiceFiscale",
          output: "codiceFiscale",
        },
        {
          input: "NomeAzienda",
          output: "nomeAzienda",
        },
        {
          input: "Cap",
          output: "CAP",
        },
        {
          input: "Comune",
          output: "comune",
        },
        {
          input: "Provincia",
          output: "provincia",
        },
        {
          input: "DataInizioAttivita",
          output: "dataInizioAttivita",
        },
        {
          input: "Pec",
          output: "PEC",
        },
        {
          input: "Telefono",
          output: "telefono",
        },
        {
          input: "Recapito",
          output: "recapito",
        },
        {
          input: "Email",
          output: "email",
        },
      ],
    },

    UnitaProduttiva: {
      campi: [
        {
          input: "Comune",
          output: "comune",
        },
        {
          input: "Provincia",
          output: "provincia",
        },
        {
          input: "Indirizzo",
          output: "indirizzo",
        },
        {
          input: "Addetti",
          output: "numeroAddettiPresenti",
        },
        {
          input: "CodiciIdentificativi",
          output: "codiciIdentificativi",
        },
        {
          input: "Name",
          output: "nome",
        },
      ],
    },

    TipoPrestazioneCausale: {
      campi: [
        {
          input: "IdTipoPrestazione",
          output: "tipoPrestazione",
        },
        {
          input: "IdTipoCausale",
          output: "causale",
        },
        {
          input: "IdTipoDomanda",
          output: "tipoDomanda",
        },
        {
          input: "IdTipoPagamento",
          output: "tipoPagamento",
        },
        {
          input: "IdFondo",
          output: "fondo",
        },
        {
          input: "Anticipo40",
          output: "anticipo",
        },
      ],
    },
    PeriodoSospensioneForzaLavoro: {
      campi: [
        {
          input: "DataInizioSospensione",
          output: "periodoSospensioneDal",
        },
        {
          input: "DataFineSospensione",
          output: "periodoSospensioneAl",
        },
        {
          input: "NumeroSettimaneSospensione",
          output: "numeroSettimane",
        },
      ]
    },

    Beneficiari: {
      campi: [
        {
          input: 'Name',
          output: 'name'
        },
        {
          input: 'Id',
          output: 'uid'
        },
        {
          input: 'MimeType',
          output: 'type'
        },
      ]
    },

    Autocertificazioni_for_external: {
      campi: [
      ]
    },

    Allegati: {
      campi: [
        {
          input: 'Name',
          output: 'name'
        },
        {
          input: 'Id',
          output: 'uid'
        },
        {
          input: 'MimeType',
          output: 'type'
        },
      ]
    },

    ListaDomande: {
      campi: [
        {
          input: "CodiceDomanda",
          output: "codiceDomanda",
        }, {
          input: "Settimane",
          output: "settimane",
        },
        {
          input: "TipoCausale",
          output: "causale",
        },
        {
          input: "MatricolaAzienda",
          output: "matricola",
        },
        {
          input: "PeriodoSospensione",
          output: "periodoDiSospensione",
        },
        {
          input: "OreSospensione",
          output: "oreDiSospensione",
        },

        {
          input: "Stato",
          output: "stato",
        },
      ],
    },

    Errors: {
      campi: [
        {
          input: 'Key',
          output: 'title'
        },
        {
          input: 'Text',
          output: 'descriptions'
        },
      ]
    }
  };
}

/* CONFIGURAZIONE PER OGNI CAMPO DELLA NUOVA DOMANDA  */
export function getConfigControlFields(
  type: string
): getConfigControlFields_interface {
  switch (type) {
    case "SET_DATI_AZIENDA":
      return [
        {
          fieldName: "matricolaINPS",
          fieldControls: [
            {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            },
            {
              id: 2,
              errorLabel: "Il campo non deve superare 11 caratteri",
              regex: /^.{1,11}$/g,
              correctAnswer: true,
            },
          ],
        },
        {
          fieldName: "codiceFiscale",
          fieldControls: [
            {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            },
          ],
        },
        {
          fieldName: "nomeAzienda",
          fieldControls: [
            {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            },
          ],
        },
        {
          fieldName: "CAP",
          fieldControls: [
            {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            },
          ],
        },
        {
          fieldName: "comune",
          fieldControls: [
            {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            },
          ],
        },
        {
          fieldName: "provincia",
          fieldControls: [
            {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            },
          ],
        },
        {
          fieldName: "dataInizioAttivita",
          fieldControls: [
            /*  {
               id: 1,
               errorLabel: "Il campo non può essere  vuoto",
               regex: /^.{0}$/g,
               correctAnswer: false,
             }, */
          ],
        },
        {
          fieldName: "PEC",
          fieldControls: [
            /* {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            }, */
            /*   {
                id: 2,
                errorLabel: `L'email inserita non è valida`,
                regex: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g,
                correctAnswer: true,
              },
              {
                id: 3,
                errorLabel: `La PEC non può essere maggiore di 50 caratteri`,
                regex: /^.{1,50}$/g,
                correctAnswer: true,
              }, */
          ],
        },
        {
          fieldName: "telefono",
          fieldControls: [
            /* {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            }, */
            /*             {
                          id: 2,
                          errorLabel: "Il telefono accetta solo numeri positivi",
                          regex: /^\d+$/g,
                          correctAnswer: true,
                        },
                        {
                          id: 3,
                          errorLabel: `Il telefono non può essere maggiore di 20 caratteri`,
                          regex: /^.{1,20}$/g,
                          correctAnswer: true,
                        }, */
          ],
        },
        {
          fieldName: "recapito",
          fieldControls: [
            /*   {
                id: 1,
                errorLabel: "Il campo non può essere  vuoto",
                regex: /^.{0}$/g,
                correctAnswer: false,
              }, */

          ],
        },
        {
          fieldName: "email",
          fieldControls: [
            /*             {
                          id: 1,
                          errorLabel: "Il campo non può essere  vuoto",
                          regex: /^.{0}$/g,
                          correctAnswer: false,
                        }, */
            /*             {
                          id: 2,
                          errorLabel: `L'email inserita non è valida`,
                          regex: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g,
                          correctAnswer: true,
                        },
                        {
                          id: 3,
                          errorLabel: `L'email non può essere maggiore di 50 caratteri`,
                          regex: /^.{1,50}$/g,
                          correctAnswer: true,
                        }, */
          ],
        },
      ];

    case "SET_DATI_PRESTAZIONE_CAUSALE":
      return [
        {
          fieldName: "tipoPrestazione",
          fieldControls: [
            {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            },
          ],
        },
        {
          fieldName: "causale",
          fieldControls: [
            {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            },
          ],
        },
        {
          fieldName: "tipoDomanda",
          fieldControls: [
            {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            },
          ],
        },
        {
          fieldName: "tipoPagamento",
          fieldControls: [
            {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            },
          ],
        },
        {
          fieldName: "fondo",
          fieldControls: [
            {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            },
          ],
        },
      ];

    case "SET_DATI_PER_SOS_FORZA_LAVORO_UP": return [
      {
        fieldName: "periodoSospensioneDal",
        fieldControls: [
          {
            id: 1,
            errorLabel: "Il campo non può essere  vuoto",
            regex: /^.{0}$/g,
            correctAnswer: false,
          },
        ],
      },
      {
        fieldName: "periodoSospensioneAl",
        fieldControls: [
          {
            id: 1,
            errorLabel: "Il campo non può essere  vuoto",
            regex: /^.{0}$/g,
            correctAnswer: false,
          },
        ],
      },
    ]

    case "SET_DATI_UNITA_PRODUTTIVA": return [
      {
        fieldName: "indirizzo",
        fieldControls: [
          /*   {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            }, */
        ],
      },
      {
        fieldName: "CAP",
        fieldControls: [
          /*  {
             id: 1,
             errorLabel: "Il campo non può essere  vuoto",
             regex: /^.{0}$/g,
             correctAnswer: false,
           }, */
        ],
      },
      {
        fieldName: "comune",
        fieldControls: [
          /*   {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            }, */
        ],
      },
      {
        fieldName: "provincia",
        fieldControls: [
          /*  {
             id: 1,
             errorLabel: "Il campo non può essere  vuoto",
             regex: /^.{0}$/g,
             correctAnswer: false,
           }, */
        ],
      },
      {
        fieldName: "numeroAddettiPresenti",
        fieldControls: [
          /*   {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            }, */
          {
            id: 2,
            errorLabel: "Il campo adetti presenti accetta solo numeri",
            regex: /^\d+$/g,
            correctAnswer: true,
          },
        ],
      },
      {
        fieldName: "codiciIdentificativi",
        fieldControls: [
          /*   {
              id: 1,
              errorLabel: "Il campo non può essere  vuoto",
              regex: /^.{0}$/g,
              correctAnswer: false,
            }, */
        ],
      },
      {
        fieldName: "nome",
        fieldControls: [
          {
            id: 1,
            errorLabel: "Il campo non può essere  vuoto",
            regex: /^.{0}$/g,
            correctAnswer: false,
          },
        ],
      },
    ]



    case "SET_DATI_ELENCO_BENEFICIARI":
      break;
    /* AUTOCERTIFICAZIONI */
    case "SET_DATI_AUTOCERTIFICAZIONI" /* GENERALE */:
      break;
    case "SET_DATI_AUTOCERTIFICAZIONI_CIGO" /* QUADRO CIGO quadroCIGO*/:
      break;
    case "SET_DATI_AUTOCERTIFICAZIONI_ASO" /* QUADRO ASO */:
      break;
    case "SET_DATI_AUTOCERTIFICAZIONI_DEROGA" /* QUADRO DEROGA */:
      break;
    /* END AUTOCERTIFICAZIONI */

    case "SET_DATI_ALLEGATI": return [
      /* {
        fieldName: "dataAccordo",
        fieldControls: [
          {
            id: 1,
            errorLabel: "Se l'accordo è stato selezionato, il campo non può essere vuoto",
            regex: /^.{0}$/g,
            correctAnswer: false,
          },
        ],
      }, */
    ]
  }
}

interface getConfigControlFields_interface {
  [index: number]: {
    fieldName: string;
    fieldControls?: fieldControls;
  };
}

interface fieldControls {
  [index: number]: {
    id: number;
    errorLabel: string;
    regex?: RegExp;
    correctAnswer: boolean; //  represents what should come out if u test regexp
  };
}
