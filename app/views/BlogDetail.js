import React from 'react';
import { Text, View, Image, ScrollView } from "react-native";
import HTML from 'react-native-render-html';

export class BlogDetail extends React.Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            postLoaded: false,
        }
    }

    componentDidMount() {
        let blogId = this.props.navigation.getParam('blogId', 'NO BLOG');
        return fetch(`https://public-api.wordpress.com/rest/v1.1/sites/myglobomantics.wordpress.com/posts/${blogId}`)
        .then(_response => _response.json())
        .then(_json => {
            this.setState({
                postLoaded: true,
                postTitle: _json.title,
                postImage: _json.featured_image,
                postContent: _json.content,
                postId: _json.ID,
            })
        }).catch(_err => console.log(_err));
    }

    goBack = () => {
        this.props.navigation.navigate('BlogRT');
    }

    render() {

        const blogTagStyles = {
            img: {
                display: 'none',
            }
        };

        const blogClassStyles = {
            blTitle: { marginLeft: 'auto', marginRight: 'auto' },
            blContent: { marginLeft: '10', marginRight: '10' },
            blBack: { marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 },
        };

        let postDetail = `
            <div class="blTitle">
                <h1>${this.state.postTitle}</h1>
            </div>
            <div class="blContent">
                ${this.state.postContent}
            </div>
            <div class="blBack">
                <a href=${this.state.postId} style="textDecorationLine: none; color: #000">
                    <h2>go back</h2>
                </a>
            </div>
        `;

        return (
            <View style={{paddingTop: 30}}>
                {this.state.postLoaded && (
                    <ScrollView>
                        <Image 
                            style={{width: '100%', height: 200}}
                            source={{uri: this.state.postImage}}
                        />
                        <HTML 
                            html={postDetail}
                            tagStyles={blogTagStyles}
                            classesStyle={blogClassStyles}
                            onLinkPress={() => this.goBack()}
                        />
                    </ScrollView>
                )}
            </View>
        );
    }

}