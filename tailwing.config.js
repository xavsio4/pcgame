'.disable-scrollbars' : {
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar' : {
        width: '0px',
        background: 'transparent',
        display: 'none'
    },
    '& *::-webkit-scrollbar' : {
        width: '0px',
        background: 'transparent',
        display: 'none'
    },
    '& *' : {
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none'
    }
}