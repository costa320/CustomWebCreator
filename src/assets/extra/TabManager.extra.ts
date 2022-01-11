/* COLORS: primary,secondary,warning,danger */
export function getIconConfigByType(iconType: string = '') {
    let icon: any;

    switch (iconType) {
        case 'it-check-circle':
            /* ✓ */
            icon = {
                name: 'it-check-circle',
                color: 'success',
                title: 'Il tab non presenta errori',
                content: 'Le informazioni fornite sono formalmente corrette'
            }
            return icon;
        case 'it-warning-circle':
            /* ! */
            icon = {
                name: 'it-warning-circle',
                color: 'warning',
                title: 'Il tab presenta alcuni errori',
                content: 'Le informazioni fornite potrebbero essere incomplete o formalmente errate'
            }
            return icon;
        case 'it-close-circle':
            /* ✗ */
            icon = {
                name: 'it-close-circle',
                color: 'danger',
                title: 'Il tab ha degli errori gravi',
                content: 'Le informazioni fornite potrebbero essere incomplete o formalmente errate'
            }
            return icon;
        case 'it-help-circle':
            /* ? */
            icon = {
                name: 'it-help-circle',
                color: 'warning'
            }
            return icon;


        default:
            icon = {
                name: null,
                color: null
            }
            return icon;
    }

}

// export function updateStatusOfTab(s: any, p: any) {
//     /*     let p = this.props;
//         let s = this.state; */
//     let { tabsConfig } = p.dataSourceTabManager;

//     /* controllo se esiste un errore già definito */
//     // Convert `dataSourceErrors` to a key/value array
//     // `[['BUF', 11], ['MIA', 9], ...]`
//     let anyField_error = Object.entries(p.dataSourceErrors).find(
//         ([key, value]) => value
//     )
//         ? true
//         : false;
//     let anyEmptyFields_error = Object.entries(p.dataSource).filter(
//         ([key, value]) => !value
//     );
//     let { domandaInModifica } = p.dataSourceTabManager;

//     /* if there is any error choose the icon */
//     let icon;

//     if (
//         domandaInModifica ||
//         anyField_error ||
//         (anyEmptyFields_error && anyEmptyFields_error.length > 0)
//     ) {
//         /* error is present in this tab */
//         icon = getIconConfigByType("it-warning-circle");
//     } else {
//         icon = getIconConfigByType("it-check-circle");
//     }
//     /* find the index of current tab and change the icon*/
//     let indexOfThisTab = tabsConfig.findIndex(
//         (tab: any) => tab.dataIndex === s.dataIndexOfTab
//     );
//     let newTabsList = tabsConfig.slice();
//     newTabsList[indexOfThisTab].icon = icon;

//     /* change the icon inside tabs configuration of redux */
//     return newTabsList
// }