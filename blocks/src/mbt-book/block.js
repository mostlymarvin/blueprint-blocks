/**
 * BLOCK: mbt-book
 *
 * MBT Book Block showing cover, blurb, buylinks, audio & book samples
 * customized to work with Blueprint Theme / Blueprint Child themes.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';




const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 
const { SelectControl, ToggleControl, TextControl } = wp.components;
const { Component } = wp.element;
const {
    RichText, 
    BlockControls, } = wp.editor;


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
        
        this.getOptions = this.getOptions.bind(this);
        // Load posts.
        this.getOptions();

        this.onChangeSelectPost = this.onChangeSelectPost.bind(this);
        this.onChangeTitlePrefix = this.onChangeTitlePrefix.bind(this);
        this.onChangeButtonsLabel = this.onChangeButtonsLabel.bind(this);
        this.onChangeFlexDirection = this.onChangeFlexDirection.bind(this);
        this.onChangeCustomLabel = this.onChangeCustomLabel.bind(this);
        this.onChangeAddPrefix = this.onChangeAddPrefix.bind(this);
        this.getButtonsLabel = this.getButtonsLabel.bind(this);
        this.getButtons = this.getButtons.bind(this);
        this.getBookMedia = this.getBookMedia.bind(this);
    
    }

    onChangeSelectPost( value ) {
        // Find the post
        const post = this.state.posts.find( ( item ) => { return item.id == parseInt( value ) } );

        // Set the state
        this.setState( { selectedPost: parseInt( value ), post } );
        
        
        const tagLine = post.mbt_book_teaser[0];
        const blurb = post.excerpt.rendered;
        const audioSample = post.mbt_sample_audio[0];
        const bookASIN = post.mbt_unique_id_asin;	
        const bookSample = bookASIN[0];
        const booklinks = post.mbt_buybuttons[0];

        const coverID = post.mbt_book_image_id[0];
        this.getBookMedia( coverID );
        
        // Set the attributes
        this.props.setAttributes( {
            selectedPost: parseInt( value ),
            title: post.title.rendered,
            link: post.link,
            buylinks: booklinks,
            tagline: tagLine,
            blurb: blurb,
            audioSample: audioSample,
            bookSample: bookSample,
            customLabel: false,
            buttonsLabel: 'Now Available From',
            titlePrefix: '',
        } );
    }

    getBookMedia( coverID ) {
        const attachment = new wp.media.model.Attachment.get( coverID );
        const coverURL = attachment.fetch().then( ( media ) => {
            this.props.setAttributes( {
                cover: media.url,
                } );
        } );
    }

    onChangeTitlePrefix( newValue ) {
        this.props.setAttributes( { titlePrefix: newValue } );
    } 

    onChangeButtonsLabel( newValue ) {
        this.props.setAttributes( { buttonsLabel: newValue } );
    } 

    onChangeFlexDirection() {
        if ( this.props.attributes.flexReverse ) {
            this.props.setAttributes( 
                { 
                    flexReverse: false,
                    flexClass: 'flex-row',
                }
            );
        } else {
            this.props.setAttributes( 
                { 
                flexReverse: true,
                flexClass: 'flex-row-reverse',
                } 
            );
        }
    }

    onChangeCustomLabel() {
        if ( this.props.attributes.customLabel ) {
            this.props.setAttributes( { customLabel: false } );
        } else {
            this.props.setAttributes( { customLabel: true } );
        }
    }   
    
    onChangeAddPrefix() {
        if ( this.props.attributes.addTitlePrefix ) {
            this.props.setAttributes( { addTitlePrefix: false } );
        } else {
            this.props.setAttributes( { addTitlePrefix: true } );
        }
    }   

    getButtonsLabel() {
        return (
            this.props.attributes.buylinks &&
            this.props.attributes.customLabel ? (
                <RichText
                tagName='h4'
                placeholder= 'Now Available From'	
                className="buttons-label"
                value={ this.props.attributes.buttonsLabel }
                onChange={ this.onChangeButtonsLabel }
                keepPlaceholderOnFocus={true}
                />
            ) : (
                <RichText.Content
                tagName='h4'	
                className="buttons-label noneditable"
                value={ this.props.attributes.buttonsLabel }
                />
            )
        );
    }

    getButtons() {
        return (
            this.props.attributes.buylinks ? (
                <ul>
                { 
                this.props.attributes.buylinks.map( (item, key) =>
                    {
                    return <li className={item.store}>
                        <a href={item.url}>
                            {item.store}
                        </a>
                    </li>;
                    }
                    )
                }
                </ul>
            ) : (
                null
            )
        );
    }

    getOptions() {
        const Book = wp.api.models.Post.extend( {
            urlRoot: wpApiSettings.root + 'wp/v2/mbt_book',
            defaults: {
                type: 'mbt_book',
                },
            } );
        
        const Books = wp.api.collections.Posts.extend( {
            url: wpApiSettings.root + 'wp/v2/mbt_book',
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
        if( this.state.post !== undefined && this.state.post.hasOwnProperty('title')) {
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
		 
            <div className={this.props.className }>
            <SelectControl 
                onChange={this.onChangeSelectPost} 
                value={ this.props.attributes.selectedPost } 
                label={ __( 'Select a Book' ) } 
                options={ options } 
                className="book-select"
            />  

            <ToggleControl
                label="Reverse Cover Position"
                checked={ !!this.props.attributes.flexReverse }
                onChange={ this.onChangeFlexDirection }
                className="flex-direction"
            />

            <div className="title-prefix-toggle is-flex">
            <ToggleControl
                label="Add Prefix to Title"
                help="ie, 'Coming Soon' or 'Just Released', etc."
                checked={ !!this.props.attributes.addTitlePrefix }
                onChange={ this.onChangeAddPrefix }
                className="add-title-prefix"
            />
            {
                this.props.attributes.addTitlePrefix && (
                    <RichText
                    tagName='h4'
                    placeholder= 'Coming Soon, etc.'	
                    className="title-prefix"
                    value={ this.props.attributes.titlePrefix }
                    onChange={ this.onChangeTitlePrefix }
                    keepPlaceholderOnFocus={true}
                    withoutInteractiveFormatting={true}
                    />
                )
            }
            </div>
			

            <div className="block-preview ">
                <h2 className="preview-title is-flex">
                {
                    this.props.attributes.titlePrefix &&
                    this.props.attributes.addTitlePrefix && (
                      <span className="title-prefix">{this.props.attributes.titlePrefix}&nbsp;
                      </span> 
                       
                    )
                }
                <span className="title">
                    { this.props.attributes.title }
                </span>
                </h2>
           
                <div className={ "inner-preview is-flex " + this.props.attributes.flexClass }>
                <div className="preview-left">

                    {
                        this.props.attributes.cover && (
                        <img 
                        src={ this.props.attributes.cover } 
                        className="preview-cover" 
                        />
                        )
                    }
                    <div className="cover-links">
                    {
                        this.props.attributes.bookSample && (
                            <span>View Book Sample</span>
                        )   
                    }
                    {
                        this.props.attributes.bookSample && this.props.attributes.audioSample && (
                            <span className="divider">&nbsp;|&nbsp;</span>
                        )
                    }
                    {
                        this.props.attributes.audioSample && (
                            <span>Hear Audiobook Sample</span>  
                        )
                    }
                    </div>
                </div>

                

                <div className="preview-right">
                   <div className="preview-right-top">

                    { 
                        this.props.attributes.tagline && (
                        <div class="preview-tagline">
                        { this.props.attributes.tagline }
                        </div>
                        )
                    }

                    { 
                        this.props.attributes.blurb && (
                        <div 
                        class="preview-blurb">
                        <span className="blurb-text"
                        dangerouslySetInnerHTML={ { __html: this.props.attributes.blurb } }
                        /><span className="blurb-link">
                            <a className="button button-primary" href={ this.props.attributes.link }>
                                Read More
                            </a>
                        </span>
                        </div>
                        
                        )
                    }
                    </div>

                    <div>

                    <ToggleControl
                        label="Custom Label for Buttons Section"
                        help="Defaults to 'Now Available From'"
                        checked={ !!this.props.attributes.customLabel }
                        onChange={ this.onChangeCustomLabel }
                        className="custom-label"
                        />
                    
                    <div className="buylinks">
                    
                       <this.getButtonsLabel/>
                       <this.getButtons/>
                       
                    
                    </div>   

                    </div>          
                </div>
            </div>
            </div>
            </div>
		)
	}
}

registerBlockType( 'blueprint-blocks/mbt-book', {
	title: __( 'Book Preview' ), 
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
		  default: null,
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
        buttonsLabel: {
            type: 'string',
            source: 'html',
            selector: '.buttons-label',
            default: 'Now Available From',
        },
        customLabel : {
            type: 'boolean',
            default: false,
        },
        flexReverse: {
            type: 'boolean',
            default: false,
        },
        customButton: {
            type: 'boolean',
            default: false,
        },
        flexClass: {
            type: 'string',
            default: 'flex-row',
        },
        addTitlePrefix: {
            type: 'boolean',
            default: false,
        },
        
	  },

	edit: mySelectPosts,

	save: function( props ) {
		return (
			<div className={ props.className }>
            <div className={ "inner is-flex " + props.attributes.flexClass }>
			  	<div className="preview-left">
                  {
                       props.attributes.cover && (
					  <a 
                        href={ props.attributes.link } 
                        className="image-link">
					  <img 
                        src={ props.attributes.cover } 
					    className="preview-cover"
					    alt={ props.attributes.title }/>
					  </a>
                       )
                  }
					<div className="cover-links">
						{
							props.attributes.bookSample && (
								<a className="preview-link book-sample" 
								href={ "https://read.amazon.com/kp/embed?asin=" + props.attributes.bookSample + "&preview=newtab" } >
								View Book Sample</a>
							)
                            
						}
                        {
                            props.attributes.bookSample && props.attributes.audioSample && (
                                <span className="divider">&nbsp;|&nbsp;</span>
                            )
                        }
						{
							props.attributes.audioSample && (
								<a 
                                    className="preview-link audio-sample" 
								    href={ props.attributes.audioSample } target="_blank" 
                                    rel="noopener noreferrer">
								Hear Audiobook Sample</a>
							)
						}
					</div>
					 
				</div>
				<div className="preview-right">
                    <div className="preview-right-top">
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
                        <div 
                        class="preview-blurb">
                        <span className="blurb-text"
                        dangerouslySetInnerHTML={ { __html: props.attributes.blurb } }
                        /><span className="blurb-link">
                            <a className="button button-primary button-inline" 
                            href={ props.attributes.link }>
                                Read More
                            </a>
                        </span>
                        </div>
                        
                        )
					}
                    </div>
                    


                    <div className="buylinks">
                    {
                        props.attributes.buylinks && props.attributes.buttonsLabel && (
                            <RichText.Content
                            tagName="h6"
                            className="buttons-label"
                            value={ props.attributes.buttonsLabel }
                            />

                        )
                    }
                    {
                    props.attributes.buylinks && (
                       <ul>
                       { 
                        props.attributes.buylinks.map( (item, key) =>
                            {
                            return <li className={item.store}>
                                <a href={item.url}>
                                    {item.store}
                                </a>
                            </li>;
                            }
                            )
                       }
                       </ul>
                       
                    )
                    }
                    </div>
				</div>
				</div>
			</div>
		  );
	},
} );
