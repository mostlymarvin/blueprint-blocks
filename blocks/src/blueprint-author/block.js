/**
 * BLOCK: Blueprint Author
 *
 * Author Profile + Photo and Social Links
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

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


        this.onChangeSelectUser = this.onChangeSelectUser.bind(this);
        this.getSocialLinks = this.getSocialLinks.bind(this);
        this.onSelectImage = this.onSelectImage.bind(this);
    
    }
    onChangeSelectUser( value ) {
        // Find the post
        const user = this.state.users.find( ( item ) => { return item.id == parseInt( value ) } );
        console.log( parseInt( value ) );
        // Set the state
        this.setState( { selectedUser: parseInt( value ), user } );

        const userName = user.profile_display_name[0];
        const userDescription = user.description;
        
        const amazon = user.amazon_link;
        const bookbub = user.bookbub_link;
        const facebook = user.facebook_link;
        const instagram = user.instagram_link;
        const linkedin = user.linkedin_link;
        const pinterest = user.pinterest_link;
        const twitter = user.twitter_link;

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
        } );
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

    getSocialLinks() {
        return (
            this.props.attributes.userLinks ? (
               <div className="blueprint-profile-links">
                { 
                    this.props.attributes.userLinks.map( (item, key) =>
                    {
                        return <div className="profile-link">
                        <a className={ item.name }
                            href={ item.link }>
                            { item.name }
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

    onSelectImage( value ) {
        console.log( value );
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
            <div className="profile-preview is-flex">
            <div className="media">
            <MediaUpload 
                onSelect={this.onSelectImage}
                render={ ({ open }) => {
                    return <img 
                        src={ this.props.attributes.imgUrl }
                        onClick={ open }
                        />;
                }}
            />
            </div>
            <div class="profile-data">

                { this.props.attributes.userName }
                { this.props.attributes.userDescription }
               
                </div>      
            </div>
            <this.getSocialLinks/>
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
        userLinks: {
            type: 'array'
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
                { props.attributes.userName }
                { props.attributes.userDescription }
                { props.attributes.userLinks }
			</div>
		  );
	},
} );