import React, {Component} from 'react';
import {View, Styleheet, Image} from 'reat-native';
import {RFValue} from 'react-native-responsive-fontsize';

import { getAuth } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import db from '../config';

import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

export default class CustomSidebarMenu extends Component {
    constructor(props) {
        super (props);
        this.state={
            light_theme: true,
        };
    }

    componentDidMount() {
        let theme;
        const auth =getAuth();
        const userId = auth.currentUser.uid;
        onValue(ref(db, '/users' + userId) , (snapshot) => {
            theme=snapshot.val().current_theme;
            this.setState({
                light_theme: theme === 'light' ? true : false,
            });
        });
    }
}