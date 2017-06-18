import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

export default class PureContent extends Component{
    static propTypes = {
        navigation: PropTypes.any
    };
    constructor(props) {
        super(props);
    }
    render() {
        let { params } = this.props.navigation.state;
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.purecontent}>{params.title}</Text>
                <Text style={styles.purecontent}>{params.author}</Text>
                <Text style={styles.purecontent}>{params.content}</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginTop : 80,
        paddingBottom : 140,
        paddingHorizontal : 12
    },
    purecontent : {
        fontSize : 20,
        lineHeight : 28,
        fontWeight : '200',
        marginBottom : 22,
    }
});
