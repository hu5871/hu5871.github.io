

import { Theme } from 'vitepress'
import Layout from './Layout.vue'
import NotFound from './NotFound.vue'


// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';


import './style/vars.css'
import './style/layout.css'
import './style/code.css'
import './style/custom-blocks.css'
import './style/sidebar-links.css'
import  './style/index.css';


const theme: Theme = {
  Layout,
  NotFound,
  enhanceApp({ app, router, siteData }) {
    
    // app.use(Antd)
  }
}

export default theme
