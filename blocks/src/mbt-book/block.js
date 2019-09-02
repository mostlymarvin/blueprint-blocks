/**
 * BLOCK: mbt-book
 *
 * MBT Book Block showing cover, blurb, buylinks, audio & book samples
 * customized to work with Blueprint Theme / Blueprint Child themes.
 */

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 
const { SelectControl, ToggleControl, TextControl, Panel, PanelBody, PanelRow } = wp.components;
const { Component, Fragment } = wp.element;
const { RichText, InspectorControls, PanelColorSettings, getColorClassName  } = wp.editor;



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

        this.getBlueprintApi = this.getBlueprintApi.bind(this);
        this.getBlueprintApi();
        
        this.getOptions = this.getOptions.bind(this);
        // Load posts.
        this.getOptions();

        this.onChangeSelectPost = this.onChangeSelectPost.bind(this);
        
        this.onChangeTitlePrefix = this.onChangeTitlePrefix.bind(this);
        this.onChangeTagline = this.onChangeTagline.bind(this);
        
        this.onChangeFlexDirection = this.onChangeFlexDirection.bind(this);
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
        this.getColorSettings = this.getColorSettings.bind(this);
        this.getBlockSettings = this.getBlockSettings.bind(this);
        this.getBookSelect = this.getBookSelect.bind(this); this.onChangeButtonBGColor = this.onChangeButtonBGColor.bind(this);
        this.onChangeButtonColor = this.onChangeButtonColor.bind(this);
        this.onChangeMoreLink = this.onChangeMoreLink.bind(this);
        this.getMoreLinkToggle = this.getMoreLinkToggle.bind(this);
        this.onChangeShowReadMore = this.onChangeShowReadMore.bind(this);
        this.onChangeShowBuyLinks = this.onChangeShowBuyLinks.bind(this);
        this.getButtonToggle = this.getButtonToggle.bind(this);
        this.onChangeReadMoreLink = this.onChangeReadMoreLink.bind(this);
        this.onChangeReadMoreText = this.onChangeReadMoreText.bind(this);
        this.getSampleLinkToggle = this.getSampleLinkToggle.bind(this);
        this.onChangeShowSampleLinks = this.onChangeShowSampleLinks.bind(this);
        this.getSampleLinks = this.getSampleLinks.bind(this);
        
    
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
            buttonsLabel: 'Now Available From',
            titlePrefix: '',
            styleURL: styleURL,
            customBlurb: blurb,
            customTagline: tagLine,
            readMoreLink: post.link,
            showReadMore: true,
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

    onChangeReadMoreLink( newValue ) {
        this.props.setAttributes( { readMoreLink: newValue });
    }

    onChangeReadMoreText( newValue ) {
        this.props.setAttributes( { readMoreText: newValue });
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
    
    onChangeAddPrefix() {
        if ( this.props.attributes.addTitlePrefix ) {
            this.props.setAttributes( { addTitlePrefix: false } );
        } else {
            this.props.setAttributes( { addTitlePrefix: true } );
        }
    } 

    onChangeShowReadMore() {
        if ( this.props.attributes.showReadMore ) {
            this.props.setAttributes( { showReadMore: false } );
        } else {
            this.props.setAttributes( { showReadMore: true } );
        }
    }   

    onChangeShowBuyLinks() {
        if ( this.props.attributes.showBuyLinks ) {
            this.props.setAttributes( { showBuyLinks: false } );
        } else {
            this.props.setAttributes( { showBuyLinks: true } );
        }
    }  
    
    onChangeShowSampleLinks() {
        if ( this.props.attributes.showSampleLinks ) {
            this.props.setAttributes( { showSampleLinks: false } );
        } else {
            this.props.setAttributes( { showSampleLinks: true } );
        }
    }  
    
    onChangeTextColor( colorText ) {
        this.props.setAttributes ( { colorText: colorText } );
    }
    onChangeBGColor( colorBG ) {
        this.props.setAttributes ( { colorBG: colorBG } );
    }
    onChangeButtonColor( colorMoreLink ) {
        this.props.setAttributes ( { colorMoreLink: colorMoreLink } );
    }
    onChangeButtonBGColor( colorMoreLinkBG ) {
        this.props.setAttributes ( { colorMoreLinkBG: colorMoreLinkBG } );
    }

    onChangeMoreLink( newValue ) {
        this.props.setAttributes ( { moreLink: newValue } );
    }

    getBlockSettings( options, message ) {
        return(
            
        this.props.attributes.title ? (
            null
        ) : (
            <div className="block-settings"> 
            <div className="block-message">{message}</div>
            { this.getBookSelect( options ) }
            </div>
        )
            
        );
    }

    getBookSelect( options ) {
        return(   
        
        <SelectControl 
        onChange={this.onChangeSelectPost} 
        value={ this.props.attributes.selectedPost } 
        label={ __( 'Select a Book' ) } 
        options={ options } 
        className="book-select"
        />
        
        );
    }

   

    getButtonsLabel() {
        const blockStyle = {
            backgroundColor: this.props.attributes.colorBG,
            color: this.props.attributes.colorText
        }
        return (
            <h4 className="buttons-label noneditable"
            style={ blockStyle }>
            { this.props.attributes.buttonsLabel }
            </h4>
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
                    value={ this.props.attributes.customBlurb  }
                    onChange={ this.onChangeCustomBlurb }
                    keepPlaceholderOnFocus={true}
                />
                 { this.getReadMoreLink() }
            </div>
            ) : (
                null
            )
        );
    }

    getReadMoreLink() {
        let buttonClass = 'button button-primary button-small bpb-more';
        let buttonBG = this.props.attributes.colorMoreLinkBG;
        let buttonColor = this.props.attributes.colorMoreLink;
        let buttonStyle = null;

        if( buttonBG ) {
            buttonStyle = { backgroundColor: buttonBG }
        }
        if( buttonColor ) {
            buttonStyle = { color: buttonColor }
        }

        if( buttonColor && buttonBG ) {
            buttonStyle = {
                backgroundColor: buttonBG,
                color: buttonColor,
            }
        }
        if( buttonBG || buttonColor ) {
            buttonClass = 'button button-custom button-small bpb-more';
        }

        return(
                this.props.attributes.showReadMore && (

               <a className={ buttonClass }
                  style={ buttonStyle }
                  href={ this.props.attributes.readMoreLink }>
                  { this.props.attributes.readMoreText }
                  </a>

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

    getSampleLinks() {
        return(
            this.props.attributes.showSampleLinks && (
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
            )

        );
    }

    getCoverToggle() {
        return (
            this.props.attributes.cover ? (
            <PanelRow>
                <ToggleControl
                label="Reverse Cover Position"
                help="Default displays cover to left"
                checked={ !!this.props.attributes.flexReverse }
                onChange={ this.onChangeFlexDirection }
                className="flex-direction"
                />
            </PanelRow>
            ) : (
                null
            )
           
        );
    }

    getButtonSegment() {
        return (
            this.props.attributes.title ? (
                <div className="buylinks"> 
                    <this.getButtonsLabel/>
                    <this.getButtons/>
                </div> 
            
            ) : (
                null
            )
        );
    }

    getButtonToggle() {
        return (
            
            <PanelRow className="display-block">
                <ToggleControl
                    label="Show Buy Links?"
                    checked={ !!this.props.attributes.showBuyLinks }
                    onChange={ this.onChangeShowBuyLinks }
                />
                {
                this.props.attributes.showBuyLinks && (
                    <TextControl
                        placeholder= 'Now Available From'	
                        label="Buy Link Section Label"
                        value={ this.props.attributes.buttonsLabel }
                        onChange={ this.onChangeButtonsLabel }
                        keepPlaceholderOnFocus={true}
                    />
                )
                }
            </PanelRow>
        );
    }

    
    getTitlePrefixToggle() {
        return (
            
            <PanelRow className="display-block">
                <ToggleControl
                    label="Add Prefix to Title"
                    help="ie, 'Coming Soon' or 'Just Released', etc."
                    checked={ !!this.props.attributes.addTitlePrefix }
                    onChange={ this.onChangeAddPrefix }
                />
                {
                    this.props.attributes.addTitlePrefix && (
                        <TextControl
                        placeholder= 'Coming Soon, etc.'	
                        value={ this.props.attributes.titlePrefix }
                        onChange={ this.onChangeTitlePrefix }
                        keepPlaceholderOnFocus={true}
                        />
                    )
                }

            </PanelRow>
        );
    }

    getSampleLinkToggle() {
        return (
            
            <PanelRow className="display-block">
                <ToggleControl
                    label="Show Book Sample Links?"
                    help="By default, shows audiobook and book sample links under the cover, if the links are available."
                    checked={ !!this.props.attributes.showSampleLinks }
                    onChange={ this.onChangeShowSampleLinks }
                />
            </PanelRow>
        );
    }

    getMoreLinkToggle() {
        return (
            
            <PanelRow className="display-block">
                <ToggleControl
                    label="Show 'Read More' Link?"
                    checked={ !!this.props.attributes.showReadMore }
                    onChange={ this.onChangeShowReadMore }
                />
                {
                    this.props.attributes.showReadMore && (
                    <PanelRow className="display-block">
                    <TextControl
                        placeholder= 'Read More'	
                        value={ this.props.attributes.readMoreText }
                        onChange={ this.onChangeReadMoreText }
                        keepPlaceholderOnFocus={true}
                    />
                    <TextControl
                        placeholder={ this.props.attributes.link }	
                        value={ this.props.attributes.readMoreLink }
                        onChange={ this.onChangeReadMoreLink }
                        keepPlaceholderOnFocus={true}
                        />
                    </PanelRow>
                    )
                }
                </PanelRow>
            
        );
    }

    getColorSettings() {
        return(

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
                {
                value: this.props.attributes.colorMoreLinkBG,
                onChange: this.onChangeButtonBGColor,
                label: __('Read More Button Background Color', 'blueprint-blocks'),
                },
                {
                value: this.props.attributes.colorMoreLink,
                onChange: this.onChangeButtonColor,
                label: __('Read More Button Text Color', 'blueprint-blocks'),
                },
                ] }
        />
        );
    }

    getBlueprintApi() {
        const Blueprint = wp.api.models.Status.extend( {
            urlRoot: wpApiSettings.root + 'blueprint-mmk/v1/blueprint',
            defaults: {
                type: 'blueprint',
                },
            } );
        const Blueprints = wp.api.collections.Statuses.extend( {
            url: wpApiSettings.root + 'blueprint-mmk/v1/blueprint',
            } );

        const theBlueprint = new Blueprints();

        theBlueprint.fetch().then( ( blueprint ) => {
            //console.log( blueprint.blueprint_social.links );
            this.props.setAttributes( {
                mbtActive: blueprint.mbt_active,
            } );

        });
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
        let message = '';
        let previewClass = 'block-preview';
        let blockStyle = {
            backgroundColor: this.props.attributes.colorBG,
            color: this.props.attributes.colorText
        }
        let textStyle = {
            color: this.props.attributes.colorText,
        }
        
        
    
        this.props.className += ' loading';

        if( this.state.posts.length > 0 ) {
            
            this.state.posts.forEach((post) => {
                options.push({value:post.id, label:post.title.rendered});
            });

        }  else {
           message =  'No books found. Please create books first.';
        }
        
        // Checking if we have anything in the object
        if( this.state.post !== undefined && this.state.post.hasOwnProperty('title')) {
           
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
                
                <this.getColorSettings/>
            
                <PanelBody 
                title="Book Settings"
                initialOpen={ true }
                className="blueprint-panel-body">

                    <PanelRow className="book-select">
                        { this.getBookSelect( options ) }
                    </PanelRow>
                    <this.getCoverToggle/> 
                    <this.getSampleLinkToggle/>
                    <this.getTitlePrefixToggle/> 
                    <this.getButtonToggle/>
                    <this.getMoreLinkToggle/>
                    

                </PanelBody>
        
            </InspectorControls>
            </div>


           
            {
                this.props.attributes.mbtActive ? (
                    
                     this.getBlockSettings( options, message ) 

                ) : (

                    <div className="block-settings"> 
                    <div className="block-message">
                    <span>MyBookTable is not active.</span>
                    <span> Please activate <a href="https://wordpress.org/plugins/mybooktable/" target="_blank">MyBookTable</a> and create books first.</span>
                    </div>
                    </div>
                )
            }
          

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

                    <this.getSampleLinks/>
                    
                </div>

                

                <div className="preview-right">
                   <div className="preview-right-top">

                   <h2 className="preview-title"
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

                    {
                        this.props.attributes.showBuyLinks && (
                            <this.getButtonSegment/>
                        )
                    }
                      

                          
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
            default: '#333333',
        },
        colorBG: {
            type: 'string',
            default: '#ffffff',
        },
        colorMoreLink: {
            type: 'string',
        },
        colorMoreLinkBG: {
            type: 'string',
        },
        mbtActive: {
            type: 'boolean',
            default: 'true',
        },
        showReadMore: {
            type: 'boolean',
            default: true
        },
        showBuyLinks: {
            type: 'boolean',
            default: true
        },
        readMoreLink: {
            type: 'string'
        },
        readMoreText: {
            type: 'string',
            default: 'Read More'
        },
        showSampleLinks: {
            type: 'boolean',
            default: true
        }
	  },

	edit: mySelectPosts,

	save: function( props ) {
		return (
			null);
	},
} );
