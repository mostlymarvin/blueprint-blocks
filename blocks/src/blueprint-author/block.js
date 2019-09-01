/**
 * BLOCK: Blueprint Author
 *
 * Author Profile + Photo and Social Links
 */

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks; 
const { SelectControl, ToggleControl } = wp.components;
const { Component } = wp.element;
const { RichText, MediaUpload  } = wp.editor;


class myAuthorEdit extends Component {
    static getInitialState( selectedUser ) {
		return {
		  users: [],
		  selectedUser: selectedUser,
          user: {}, 
		};
      }
      

    constructor() {
        super( ...arguments );
        
        this.state = this.constructor.getInitialState( this.props.attributes.selectedUser );
        
        this.getUsers = this.getUsers.bind(this);
        // Load users.
        this.getUsers();

        this.getBlueprintApi = this.getBlueprintApi.bind(this);
        this.getBlueprintApi();


        this.onChangeSelectUser = this.onChangeSelectUser.bind(this);
        this.getSocialLinks = this.getSocialLinks.bind(this);
        this.getSiteLinks = this.getSiteLinks.bind(this);
        this.getUserLinks = this.getUserLinks.bind(this);
        this.onSelectImage = this.onSelectImage.bind(this);
        this.getLinkTypeToggle = this.getLinkTypeToggle.bind(this);
        this.onChangeLinkType = this.onChangeLinkType.bind(this);
        this.onChangeProfileTitle = this.onChangeProfileTitle.bind(this);
    
    }
    onChangeSelectUser( value ) {
        // Find the post
        const user = this.state.users.find( ( item ) => { return item.id == parseInt( value ) } );
        //console.log( parseInt( value ) );
        // Set the state
        this.setState( { selectedUser: parseInt( value ), user } );

        const userName = user.profile_display_name ? user.profile_display_name[0] : null;
        const userDescription = user.description ? user.description : null;
        console.log( userDescription );
        const amazon = user.amazon_link ? user.amazon_link : null;
        const bookbub = user.bookbub_link ? user.bookbub_link : null;
        const facebook = user.facebook_link ? user.facebook_link : null;
        const instagram = user.instagram_link ? user.instagram_link : null;
        const linkedin = user.linkedin_link ? user.linkedin_link : null;
        const pinterest = user.pinterest_link ? user.pinterest_link : null;
        const twitter = user.twitter_link ? user.twitter_link : null;

        const socialLinks = [
           {
               name: 'amazon', 
               link : amazon,
           },
           {
               name: 'bookbub', 
               link : bookbub,
           },
           {
               name: 'facebook', 
               link : facebook,
           },
           {
               name: 'instagram', 
               link : instagram,
           },
           {
               name: 'linkedin', 
               link : linkedin,
           },
           {
               name: 'pinterest', 
               link : pinterest,
           },
           {
               name: 'twitter', 
               link : twitter,
           },
        ];

        // Set the attributes
        this.props.setAttributes( {
            selectedUser: parseInt( value ),
            userName: userName,
            userDescription: userDescription,
            userLinks: socialLinks,
            customTitle: this.props.attributes.customTitle ? this.props.attributes.customTitle : userName,
        } );
    }

     

    onChangeProfileTitle( newValue ) {
        this.props.setAttributes( { customTitle: newValue } );
    } 

    onChangeLinkType() {
        
        if ( this.props.attributes.useSiteLinks ) {
            this.props.setAttributes( { 
                useSiteLinks: false,
            } );
           // console.log( this.props.attributes.whichLinks );
        } else {
            this.props.setAttributes( { 
                useSiteLinks: true,
             } );
           // console.log( this.props.attributes.whichLinks );
        }
    
    }   

    getUsers() {

        return ( new wp.api.collections.Users() ).fetch().then( ( users ) => {
            if( users && 0 !== this.state.selectedUser ) {
            
              const user = users.find( ( item ) => { return item.id == this.state.selectedUser } );
              

              this.setState( { user, users } );

            } else {
              this.setState({ users });
            }
          });
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
                siteLinks: blueprint.blueprint_social.links,
                siteLinkDisplay: blueprint.blueprint_social.display,
            } );

        });
    }

    getLinkTypeToggle() {
        return (
            <ToggleControl
            label="Use site-wide social media links instead of user profile social links?"
            checked={ !! this.props.attributes.useSiteLinks }
            onChange={ this.onChangeLinkType }
            className="link-type"
            />
        );
    }

    getUserLinks() {
        return (
            this.props.attributes.userLinks ? (
               <div className="blueprint-profile-links user-links">
               <ul>
                { 
                    this.props.attributes.userLinks.map( (item, key) =>
                    {
                        return <li className="profile-link">
                        <a className={ item.name + ' icon-' + item.name }
                            href={ item.link }>
                            <span>{ item.name }</span>
                        </a>
                        </li>
                    }
                    )
                }
                </ul>
               </div>
            ) : (
                null
            )
            );
    }

    getSiteLinks() {
        return (
            this.props.attributes.siteLinks ? (
            <div className="blueprint-profile-links site-links">
            <ul>
            { 
                this.props.attributes.siteLinks.map( (item, key) =>
                {
                    return <li className="profile-link">
                    <a className={ item.network + ' icon-' + item.network }
                        href={ item.url }>
                        <span>{ item.network }</span>
                    </a>
                    </li>
                }
                )
            }
            </ul>
            </div>
            ) : (
                null
            )
        );
    }

    getSocialLinks() {
        return (
            this.props.attributes.useSiteLinks ? (
                <this.getSiteLinks/>
            ) : (
                <this.getUserLinks/>
               
            )
        )
    }

    onSelectImage( value ) {
        //console.log( value );
        this.props.setAttributes({
            imgUrl: value.sizes.full.url,
        })
    }

    
    render() {
        let options = [ { value: 0, label: __( 'Select a User' ) } ];
        let output = 'Choose User';
    
        this.props.className += ' loading';

        if( this.state.users.length > 0 ) {
            this.state.users.forEach( ( user ) => {
            options.push({ value:user.id, label:user.name });
        });
        
        } else {
            output = __( 'No users found.' );
        }
        // Checking if we have anything in the object
        if( this.state.user !== undefined && this.state.user.hasOwnProperty('name')) {
            output = <div className="user">
            <a href={ this.state.user.link }> 
                { this.state.user.name }
            </a>
            </div>;
        
            this.props.className += ' has-user';

        } else {
            this.props.className += ' no-user';
        }

        
    
		return (
		 
            <div className={this.props.className }>

            <SelectControl 
                onChange={this.onChangeSelectUser} 
                value={ this.props.attributes.selectedUser } 
                label={ __( 'Select an Author' ) } 
                options={ options } 
                className="author-select"
            />  
            <this.getLinkTypeToggle/>
            <div className="profile-preview">

            <h3 className="profile-title">
            <RichText
                tagName='span'
                placeholder= { this.props.attributes.customTitle }
                className="buttons-label"
                value={ this.props.attributes.customTitle }
                onChange={ this.onChangeProfileTitle }
                keepPlaceholderOnFocus={true}
                />
            </h3>
            <div className="inner ">
            <div className="profile-main">
           
            <MediaUpload 
                onSelect={this.onSelectImage}
                render={ ({ open }) => {
                    return <div className="media">
                            <span className="dashicons dashicons-edit edit-media" onClick={ open }></span>
                            <img 
                            src={ this.props.attributes.imgUrl }
                            onClick={ open }
                            /></div>;
                }}
            />
            
            <div class="profile-data"> 
                
                <div class="profile-blurb">
                { this.props.attributes.userDescription }
                </div>
                </div>      
            </div>
                <this.getSocialLinks/>
            </div>
            </div>
            </div>
		)
	}
}

registerBlockType( 'blueprint-blocks/blueprint-author', {
	title: __( 'Author Profile' ), 
	icon: 'admin-users', 
	category: 'blueprint-blocks',
	keywords: [
		__( 'Author' ),
        __( 'Blueprint' ),
        __( 'Profile' ),
	],
	attributes: {
        selectedUser: {
            type: 'number',
            default: null,
        },
        userName: {
            type: 'string',
        },
        userDescription: {
            type: 'string',
        },
        customTitle: {
             type: 'string',   
        },
        useSiteLinks : {
            type: 'boolean',
            default: false
        },
        userLinks: {
            type: 'array'
        },
        siteLinks: {
            type: 'array',
        },
        siteLinkDisplay: {
            type: 'array',
        },
        imgUrl: {
            type: 'string',
            default: 'http://placehold.it/500',
        }
	  },

	edit: myAuthorEdit,

	save: function( props ) {
		//console.log( props.attributes.buylinks );

		return (
			<div className={ props.className }>
            
            <h3 className="profile-title">
                <span>{ props.attributes.customTitle }</span>
            </h3>

            <div className="inner is-flex">
            <div className="profile-main">
                <div className="media">
                <img src={ props.attributes.imgUrl }
                className="profile-image"/>
                </div>
                <div className="profile-info">
                    <RichText.Content
                    className="profile-blurb"
                    tagName='div'
                    multiline='p'
                    value={ props.attributes.userDescription }
                   />
                </div>
            </div>
            <div className="blueprint-profile-links">
            <ul>
                {
                    props.attributes.useSiteLinks ? (
                        props.attributes.siteLinks.map( (item, key) =>
                    {
                        return <li className="profile-link">
                        <a className={ item.network + ' icon-' + item.network }
                            href={ item.url }>
                            <span>{ item.network }</span>
                        </a>
                        </li>
                    }
                    )

                    ) : (
                    props.attributes.userLinks.map( (item, key) =>
                    {
                        return <li className="profile-link">
                        <a className={ item.name + ' icon-' + item.name }
                            href={ item.link }>
                            <span>{ item.name }</span>
                        </a>
                        </li>
                    }
                    )
                    )
                }
            </ul>
            </div>
			</div>
            </div>
		  );
	},
} );