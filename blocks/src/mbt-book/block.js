/**
 * BLOCK: mbt-book
 *
 * MBT Book Block showing cover, blurb, buylinks, audio & book samples
 * customized to work with Blueprint Theme / Blueprint Child themes.
 */

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 
const { SelectControl, ToggleControl, Panel, PanelBody, PanelRow } = wp.components;
const { Component, Fragment } = wp.element;
const { RichText, InspectorControls, withColors, PanelColorSettings, getColorClassName  } = wp.editor;
const { createHigherOrderComponent } = wp.compose;


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
        this.onChangeTagline = this.onChangeTagline.bind(this);
        
        this.onChangeFlexDirection = this.onChangeFlexDirection.bind(this);
        this.onChangeCustomLabel = this.onChangeCustomLabel.bind(this);
        this.onChangeCustomBlurb = this.onChangeCustomBlurb.bind(this);
        this.onChangeButtonsLabel = this.onChangeButtonsLabel.bind(this);
        this.onChangeAddPrefix = this.onChangeAddPrefix.bind(this);
        this.getTitlePrefixToggle = this.getTitlePrefixToggle.bind(this);
        this.getTagline = this.getTagline.bind(this);
        this.getPreviewBlurb = this.getPreviewBlurb.bind(this);
        this.getCoverToggle = this.getCoverToggle.bind(this);
        this.getButtonsLabel = this.getButtonsLabel.bind(this);
        this.getButtons = this.getButtons.bind(this);
        this.getButtonSegment = this.getButtonSegment.bind(this);
        this.getBookMedia = this.getBookMedia.bind(this);
        this.onChangeTextColor = this.onChangeTextColor.bind(this);
        this.onChangeBGColor = this.onChangeBGColor.bind(this);
    
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
        const styleURL = post.mbt_editor_style_url;

        
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
            styleURL: styleURL,
            customBlurb: blurb,
            customTagline: tagLine,
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

    onChangeCustomBlurb( newValue ) {
        this.props.setAttributes( { customBlurb: newValue } );
    } 

    onChangeTagline( newValue ) {
        this.props.setAttributes( { customTagline: newValue } );
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
            this.props.setAttributes( { 
                customLabel: false,
                buttonsLabel: 'Now Available From',
             } );
        } else {
            this.props.setAttributes( {
                customLabel: true,
                buttonsLabel: this.props.attributes.buttonsLabel
            } );
        }
    }   
    
    onChangeAddPrefix() {
        if ( this.props.attributes.addTitlePrefix ) {
            this.props.setAttributes( { addTitlePrefix: false } );
        } else {
            this.props.setAttributes( { addTitlePrefix: true } );
        }
    }   
    
    onChangeTextColor( colorText ) {
        this.props.setAttributes ( { colorText: colorText } );
    }
    onChangeBGColor( colorBG ) {
        this.props.setAttributes ( { colorBG: colorBG } );
    }

    getButtonsLabel() {
        const blockStyle = {
            backgroundColor: this.props.attributes.colorBG,
            color: this.props.attributes.colorText
        }
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
                <h4 className="buttons-label noneditable"
                style={ blockStyle }>
                { this.props.attributes.buttonsLabel }
                </h4>
            
            )
        );
    }

    getTagline() {
        return (
            this.props.attributes.title ? (
            <RichText
                tagName='div'
                placeholder= 'Lorem Ipsum Dolor Sunt...'	
                className='preview-tagline'
                value={ this.props.attributes.customTagline }
                onChange={ this.onChangeTagline }
                keepPlaceholderOnFocus={true}
                /> 
            ) : (
                null
            )
        );
    }
    
    getPreviewBlurb() {

        return (
            this.props.attributes.title ? (
            <div class="preview-blurb">
                <RichText
                    tagName='div'
                    multiline='p'
                    placeholder='Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Nulla vitae elit libero, a pharetra augue.'	
                    className="custom-blurb"
                    value={ this.props.attributes.customBlurb }
                    onChange={ this.onChangeCustomBlurb }
                    keepPlaceholderOnFocus={true}
                />
            </div>
            ) : (
                null
            )
        );
    }

    getButtons() {
        return (
            this.props.attributes.buylinks ? (
               <div className="mbt-book-buybuttons blueprint">
                { 
                this.props.attributes.buylinks.map( (item, key) =>
                    {
                    return <div className="mbt-book-buybutton">
                    <a className="image-link"
                        href={item.url}>
                        <img className="image-link"
                        src={this.props.attributes.styleURL + item.store + '_button.png'} 
                        alt={ 'buy from ' + item.store }/> 
                        </a>
                    </div>
                    }
                    )
                }
               </div>
            ) : (
                null
            )
        );
    }

    getCoverToggle() {
        return (
            this.props.attributes.title &&
            this.props.attributes.cover ? (
                <ToggleControl
                label="Reverse Cover Position"
                checked={ !!this.props.attributes.flexReverse }
                onChange={ this.onChangeFlexDirection }
                className="flex-direction"
            />
            ) : (
                null
            )
           
        );
    }

    getButtonSegment() {
        return (
            this.props.attributes.title ? (
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
            ) : (
                null
            )
        );
    }

    getTitlePrefixToggle() {
        return (
            this.props.attributes.title ? (
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
        let options = [ { value: 0, label: __( 'Select a Book' ) } ];
        let mbtActive = false;
        let previewClass = 'block-preview';
        let blockStyle = {
            backgroundColor: this.props.attributes.colorBG,
            color: this.props.attributes.colorText
        }
        let textStyle = {
            color: this.props.attributes.colorText,
        }
        let bgStyle = {
            backgroundColor: this.props.attributes.colorBG
        }
    
        this.props.className += ' loading';

        if( this.state.posts.length > 0 ) {
            
            this.state.posts.forEach((post) => {
                options.push({value:post.id, label:post.title.rendered});
            });
        
        } 
        // Checking if we have anything in the object
        if( this.state.post !== undefined && this.state.post.hasOwnProperty('title')) {
           
            mbtActive = true;
            this.props.className += ' has-post';

        } else {
            this.props.className += ' no-post';
        }

        if( this.props.attributes.title !== undefined ) {
            previewClass = 'block-preview active-preview';
        }

    
		return (

            <div 
            className={ this.props.className }
            style={ blockStyle }>

            <div>
            <InspectorControls>   
                
                        <PanelColorSettings 
                            title={ __('Colors', 'blueprint-blocks') }
                            initialOpen={false}
                            colorSettings= { [ 
                                {
                                value: this.props.attributes.colorText,
                                onChange: this.onChangeTextColor,
                                label: __('Text Color', 'blueprint-blocks'),
                                },
                                {
                                value: this.props.attributes.colorBG,
                                onChange: this.onChangeBGColor,
                                label: __('Background Color', 'blueprint-blocks'),
                                },
                             ] }
                        />
    
                       
                    
                    
               
                </InspectorControls>
              </div>


            <div className="block-settings">
            {
                this.props.attributes.title ? (
                    <div className="block-message active">
                    <h2>{ this.props.attributes.title }</h2>
                    </div>
                ) : (
                    <div className="block-message"><span>No books found, or MyBookTable is not active.</span><span> Please activate <a href="https://wordpress.org/plugins/mybooktable/" target="_blank">MyBookTable</a> or create books first.</span></div>
                )
            }

            {
            mbtActive && (
            <SelectControl 
                onChange={this.onChangeSelectPost} 
                value={ this.props.attributes.selectedPost } 
                label={ __( 'Select a Book' ) } 
                options={ options } 
                className="book-select"
            />  
            )
            
            }

            <this.getCoverToggle/> 
            <this.getTitlePrefixToggle/> 
             </div>

            <div className={ previewClass }>           
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

                   <h2 className="preview-title is-flex"
                        style={ textStyle }>
                    {
                        this.props.attributes.titlePrefix &&
                        this.props.attributes.addTitlePrefix && (
                        <span className="title-prefix"> 
                            {this.props.attributes.titlePrefix}&nbsp;
                        </span> 
                        )
                    }
                        <span className="title">
                            { this.props.attributes.title }
                        </span>
                    </h2>
                    
                        <this.getTagline/>

                    
                        <this.getPreviewBlurb/>
                        
                    
                    </div>

                      <this.getButtonSegment/>

                          
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
	category: 'blueprint-blocks',
	keywords: [
		__( 'blueprint-blocks — mbt-book' ),
		__( 'Book' ),
	],
	attributes: {
      selectedPost: {
         type: 'number',
         default: null,
     },
        addTitlePrefix: {
            type: 'boolean',
            default: false,
        },
        audioSample: {
            type: 'string',
            default: '',
        },
        blurb: {
            type: 'string',
        },
        bookSample: {
            type: 'string',
            default: '',
        },
        buttonsLabel: {
            type: 'string',
            default: 'Now Available From',
        },
        buylinks: {
            type: 'array',
        },
        cover: {
            type: 'string',
        },
        customBlurb: {
            type: 'string',
        },
        customButton: {
            type: 'boolean',
            default: false,
        },
        customLabel : {
            type: 'boolean',
            default: false,
        },
        customTagline: {
            type: 'string',
        },
        flexClass: {
            type: 'string',
            default: 'flex-row',
        },
        flexReverse: {
            type: 'boolean',
            default: false,
        },
        link: {
            type: 'string',
            selector: 'a'
        },
        
        styleURL: {
            type: 'string'
        },
        tagline: {
            type: 'string',
        },
        title: {
            type: 'string',
        },
        titlePrefix: {
            type: 'string',
        },
        colorText: {
            type: 'string',
            default: 'inherit',
        },
        colorBG: {
            type: 'string',
            default: 'inherit',
        },
	  },

	edit: mySelectPosts,

	save: function( props ) {
		return (
			null);
	},
} );
