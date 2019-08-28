/**
 * BLOCK: mbt-book
 *
 * MBT Book Block showing cover, blurb, buylinks, audio & book samples
 * customized to work with Blueprint Theme / Blueprint Child themes.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 
const { SelectControl } = wp.components;
const { Component, ColorPalette } = wp.element;
const { RichText } = wp.editor;
const { withState } = wp.compose;

class mySelectPosts extends Component {
	static getInitialState( selectedPost ) {
		return {
		  posts: [],
		  selectedPost: selectedPost,
		  post: {}, 
		};
	  }

    constructor() {
    super( ...arguments );
    this.state = this.constructor.getInitialState( this.props.attributes.selectedPost );
    // Bind so we can use 'this' inside the method.
    this.getOptions = this.getOptions.bind(this);
    // Load posts.
    this.getOptions();
    this.onChangeSelectPost = this.onChangeSelectPost.bind(this);
    this.onChangeTitlePrefix = this.onChangeTitlePrefix.bind(this);
    
    }

    onChangeSelectPost( value ) {
    // Find the post
    const post = this.state.posts.find( ( item ) => { return item.id == parseInt( value ) } );

    
    // Set the state
    this.setState( { selectedPost: parseInt( value ), post } );
    
    const bookCover = post._stacks_bookview[0].cover;
    const tagLine = post._stacks_bookview[0].tagline;
    const blurb = post._stacks_bookview[0].blurb;
    const audioSample = post._stacks_audiobook[0].audio_sample_oembed;
    const bookSample = post._stacks_bookextras[0].sample_link;	

    const buylinks = post._stacks_buylinks;
    const booklinks = [].concat(...buylinks);
        
    const linkList = booklinks.map((item, key) =>
            <li className={item.vendor}>
            <a href={item.link}>{item.vendor}</a>
            </li>
        );
    

    // Set the attributes
    this.props.setAttributes( {
        selectedPost: parseInt( value ),
        title: post.title.rendered,
        link: post.link,
        buylinks: linkList,
        cover: bookCover,
        tagline: tagLine,
        blurb: blurb,
        audioSample: audioSample,
        bookSample: bookSample,
        } );
    }

    onChangeTitlePrefix( newValue ) {
        console.log( newValue );
        this.props.setAttributes( { titlePrefix: newValue } );
    } 

    getOptions() {
        const Book = wp.api.models.Post.extend( {
            urlRoot: wpApiSettings.root + 'wp/v2/stacks-book',
            defaults: {
                type: 'stacks-book',
                },
            } );
        
        const Books = wp.api.collections.Posts.extend( {
            url: wpApiSettings.root + 'wp/v2/stacks-book',
            } );

        const theBooks = new Books();
        
        theBooks.fetch().then( ( posts ) => {
        
        if( posts && 0 !== this.state.selectedPost ) {
            // If we have a selected Post, find that post and add it.
            const post = posts.find( ( item ) => { return item.id == this.state.selectedPost } );

            this.setState( { post, posts } );
            
            } else {
                this.setState({ posts });
            }
        } );  
    }
	
    render() {
        let options = [ { value: 0, label: __( 'Select a Post' ) } ];
        let output  = __( 'Choose Book' );
    

        this.props.className += ' loading';

        if( this.state.posts.length > 0 ) {
            this.state.posts.forEach((post) => {
            options.push({value:post.id, label:post.title.rendered});
        });
        
        } else {
            output = __( 'No posts found. Please create some first.' );
        }
        // Checking if we have anything in the object
        if( this.state.post.hasOwnProperty('title') ) {
            output = <div className="post">
            <a href={ this.state.post.link }> 
                { this.state.post.title.rendered }
            </a>
            </div>;
        
            this.props.className += ' has-post';

        } else {
            this.props.className += ' no-post';
        }
    
		return (
		 
            <div className={this.props.className}>
            <div className='is-flex'>
            <label className='components-base-control__label'>Title Prefix: &nbsp;&nbsp;&nbsp;</label>

            <RichText
            tagName='h4'
            placeholder= 'Coming Soon, etc.'	
            className="title-prefix"
            value={ this.props.attributes.titlePrefix }
            onChange={ this.onChangeTitlePrefix }
            />
            </div>

            <SelectControl 
                onChange={this.onChangeSelectPost} 
                value={ this.props.attributes.selectedPost } 
                label={ __( 'Select a Book' ) } 
                options={ options } 
            />

            </div>
		)
	}
}

registerBlockType( 'blueprint-blocks/mbt-book', {
	title: __( 'MBT Book Custom Display' ), 
	icon: 'book', 
	category: 'common',
	keywords: [
		__( 'blueprint-blocks — mbt-book' ),
		__( 'Book' ),
	],
	attributes: {
		title: {
		  type: 'string',
		},
		link: {
		  type: 'string',
		  selector: 'a'
		},
		selectedPost: {
		  type: 'number',
		  default: 0,
		},
		buylinks: {
			type: 'array',
		},
		cover: {
			type: 'string',
		},
		tagline: {
			type: 'string',
		},
		blurb: {
			type: 'string',
		},
		audioSample: {
			type: 'string',
			default: '',
		},
		bookSample: {
			type: 'string',
			default: '',
		},
		titlePrefix: {
			type: 'string',
			source: 'html',
			selector: '.title-prefix',
		},
	  },

	edit: mySelectPosts,

	save: function( props ) {
		//console.log( props.attributes.buylinks );
		
		return (
			<div className={ props.className }>
			  	<div className="preview-left">
					  <a href={ props.attributes.link } className="image-link">
					  <img 
					  src={ props.attributes.cover } 
					  className="preview-cover"
					  alt={ props.attributes.title }/>
					  </a>
					<div className="cover-links">
						{
							props.attributes.bookSample && (
								<a className="preview-link book-sample" 
								href={ props.attributes.bookSample } >
								View Book Sample</a>
							)
						}
						{
							props.attributes.audioSample && (
								<a className="preview-link audio-sample" 
								href={ props.attributes.audioSample } >
								Hear Audiobook Sample</a>
							)
						}
					</div>
					 
				</div>
				<div className="preview-right">
					<h2 className="preview-title">
					{
						props.attributes.titlePrefix && (
						<RichText.Content 
							tagName="span" 
							className="title-prefix" 
							value={ props.attributes.titlePrefix } 
							/>
						)
					}
						{ props.attributes.title }
					</h2>

					{ 
						props.attributes.tagline && (
							<div class="preview-tagline">
							{ props.attributes.tagline }
							</div>
						)
					}
					{ 
						props.attributes.blurb && (
							<div class="preview-blurb">
							{ props.attributes.blurb }
							</div>
						)
					}
					<a href={ props.attributes.link } className="button button-primary">{ props.attributes.title } ></a>
					<ul className="link-list">
						{ props.attributes.buylinks }
					</ul>
				</div>
				
			</div>
		  );
	},
} );
