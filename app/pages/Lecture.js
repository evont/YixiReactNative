import React, { Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import Spinner from 'react-native-spinkit';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import global_style from '../global_style';
import {fetchLecture} from '../api';
const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor : '#fff'
    },
    navigate : {
        position : 'absolute',
        right : 12,
        top : 0,
        width : 240,
        height : 60,
        alignItems : 'center',
        justifyContent : 'flex-end',
        flexDirection : 'row'
    },
    navigateBtn : {
        height : 28,
        width : 48,
        marginLeft : 10,
        marginTop : 28,
        borderRadius : 4,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: '#ddd'
    },
    BtnActived : {
        backgroundColor : '#cc3434'
    },
    BtnText : {
        fontSize : 14,
        fontWeight : '100',
        color : '#333'
    },
    BtnTextActived : {
        color : '#fff'
    },
    lecturerContainer : {
        marginTop : 80,
        flex : 1,
        backgroundColor : '#fff'
    },
    barTextStyle : {
        fontWeight : '100',
        fontSize : 14
    },
    underlineStyle : {
        borderTopLeftRadius : 2,
        borderTopRightRadius : 2,
    },
    lectureListItem : {
        backgroundColor : '#f8f8f8',
        borderBottomWidth : StyleSheet.hairlineWidth,
        borderBottomColor : '#ddd',
        paddingVertical : 8,
        flexDirection : 'row'
    },
    itemCover : {
        width : 100,
        height : 68,
        marginHorizontal : 10,
        resizeMode : 'contain'
    },
    itemDetail : {
        flex : 1,
        flexDirection : 'column'
    },
    detailHeader : {
        flex : 1,
        height : 18,
        fontSize : 16,
        fontWeight : '400'
    },
    detailAuthor : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        height : 16,
    },
    authorText : {
        fontSize : 13,
        fontWeight : '200',
        color : '#999',
        marginRight : 8
    },
    detailInfo : {
        flex : 1,
        flexDirection : 'row'
    },
    InfoItem : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        alignSelf : 'flex-end'
    },
    InfoIcon : {
        width : 14,
        height : 14,
        resizeMode : 'contain'
    },
    InfoText : {
        fontSize : 13,
        marginLeft : 4,
        color : '#999',
        fontWeight : '200'
    }
});
export default class Lecture extends Component{
    static propTypes = {
        navigation: PropTypes.any
    };
    constructor(props) {
        super(props);
        this.state = {
            albumList : [],
            loadingState : true,
            lectureType : 'date'
        };
        this.fetchData = this.fetchData.bind(this);
        this.renderList = this.renderList.bind(this);
        this.renderLectures = this.renderLectures.bind(this);
    }
    async fetchData(api_type='date') {
        this.setState({
            lectureType : api_type,
            loadingState : true,
        });
        let album = await fetchLecture(api_type);
        this.setState({
            albumList : album,
            loadingState : false
        });
    }
    componentDidMount() {
        this.fetchData();
    }
    renderLectures(lectures) {
        return (
            lectures.map( (ele, ind) =>
                <TouchableHighlight key={`lectures-${ind}`} onPress={ () => this.props.navigation.navigate('Detail',{lectures : ele, lecturesId : ele.id }) }>
                    <View style={styles.lectureListItem}>
                        <Image source={{ url : ele.cover }} style={styles.itemCover} />
                        <View style={styles.itemDetail}>
                            <Text style={styles.detailHeader}>{ele.title}</Text>
                            <View style={styles.detailAuthor}><Text style={styles.authorText}>{ele.lecturer.nickname}</Text><Text style={styles.authorText}>{ele.time}</Text></View>
                            <View style={styles.detailInfo}>
                                <View style={styles.InfoItem}>
                                    <Image source={require('../images/ico-info-play.png')} style={styles.InfoIcon}/>
                                    <Text style={styles.InfoText}>{ele.viewnum}</Text>
                                </View>
                                <View style={styles.InfoItem}>
                                    <Image source={require('../images/ico-info-like.png')} style={styles.InfoIcon}/>
                                    <Text style={styles.InfoText}>{ele.likenum}</Text>
                                </View>
                                <View style={styles.InfoItem}>
                                    <Image source={require('../images/ico-info-comment.png')} style={styles.InfoIcon}/>
                                    <Text style={styles.InfoText}>{ele.cmtnum}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        );
    }
    renderList() {
        let albumList = this.state.albumList.data;
        if(this.state.lectureType === 'date') {
            return (
                <ScrollableTabView
                    tabBarActiveTextColor='#cc3434'
                    tabBarTextStyle = {styles.barTextStyle}
                    tabBarUnderlineStyle = { styles.underlineStyle}
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    {albumList.map( (ele, ind) =>
                        <ScrollView tabLabel={ele.date} key={`date-${ind}`}>
                            {this.renderLectures(ele.lectures)}
                        </ScrollView>
                    )}
                </ScrollableTabView>
            );
        } else {
            return (
                <ScrollView>{this.renderLectures(albumList)}</ScrollView>
            );
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navigate}>
                    <TouchableHighlight onPress={()=>this.fetchData('date')} style={[styles.navigateBtn, this.state.lectureType === 'date' && styles.BtnActived]}>
                        <Text style={[styles.BtnText, this.state.lectureType === 'date' && styles.BtnTextActived]}>日期</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.fetchData('view')} style={[styles.navigateBtn, this.state.lectureType === 'view' && styles.BtnActived]}>
                        <Text style={[styles.BtnText, this.state.lectureType === 'view' && styles.BtnTextActived]}>观看</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.fetchData('like')} style={[styles.navigateBtn, this.state.lectureType === 'like' && styles.BtnActived]}>
                        <Text style={[styles.BtnText, this.state.lectureType === 'like' && styles.BtnTextActived]}>喜欢</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.lecturerContainer}>
                    {this.state.loadingState ?
                        <View style={global_style.loadingContainer}>
                            <Spinner
                                isVisible={true}
                                size={50}
                                type='ThreeBounce'
                                color='#cc3434'
                            />
                        </View>
                        : this.state.albumList.data ?
                            this.renderList()
                            :
                            <TouchableHighlight style={global_style.hintContainer} onPress={ () => this.fetchData }>
                                <Text style={global_style.hintText}>网络异常，请点击重新加载</Text>
                            </TouchableHighlight>
                    }
                </View>
            </View>
        );
    }
}
