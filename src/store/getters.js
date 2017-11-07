const getters = {
    menuList: state => state.menuList,
    tagsList: state => state.tagsList, // 所有页面的页面对象
    pageTagsList: state => state.pageOpenedList, // 打开的页面的页面对象
    currentPath: state => state.currentPath, // 当前面包屑数组
    menuIconColor: state => state.menuTheme === 'dark' ? 'white' : '#495060',
};

export default getters;