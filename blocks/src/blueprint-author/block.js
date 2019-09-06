/**
 * BLOCK: Blueprint Author
 *
 * Author Profile + Photo and Social Links
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { SelectControl, ToggleControl } = wp.components;
const { Component } = wp.element;
const { RichText, MediaUpload, InnerBlocks  } = wp.editor;

const TEMPLATE = [
	['blueprint-blocks/social-link', {}, []],
]

class myAuthorEdit extends Component {
    static getInitialState( selectedAuthor ) {
		return {
          authors: [],
          selectedAuthor: selectedAuthor,
          author: {},
		};
      }


    constructor() {
        super( ...arguments );

        this.state = this.constructor.getInitialState( this.props.attributes.selectedUser );

        this.getAuthors = this.getAuthors.bind(this);
        this.getAuthors();

        this.getBlueprintApi = this.getBlueprintApi.bind(this);
        this.getBlueprintApi();

        this.onChangeSelectAuthor = this.onChangeSelectAuthor.bind(this);

        this.onSelectImage = this.onSelectImage.bind(this);
        this.onChangeProfileTitle = this.onChangeProfileTitle.bind(this);
    }

    getAuthors() {

        const Author = wp.api.models.Taxonomy.extend( {
            urlRoot: wpApiSettings.root + 'wp/v2/mbt_author',
            } );
        const Authors = wp.api.collections.Taxonomies.extend( {
            url: wpApiSettings.root + 'wp/v2/mbt_author',
            } );

        const theAuthors = new Authors();

        theAuthors.fetch().then( ( authors ) => {

            if( authors && 0 !== this.state.selectedAuthor ) {
                // If we have a selected Post, find that post and add it.
                const author = authors.find( ( item ) => { return item.id == this.state.selectedAuthor } );

                this.setState( { author, authors } );

                } else {
                   this.setState({ authors });
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

    onChangeSelectAuthor( value ) {
        // Find the author
        const author = this.state.authors.find( ( item ) => { return item.id == parseInt( value ) } );

        // Set the state
        this.setState( { selectedAuthor: parseInt( value ), author } );

        const authorName = author.name ? author.name : null;
        console.log( authorName );

        const authorDescription = author.description ? author.description : null;

        const authorLink = author.link ? author.link : null;

        // Set the attributes
        this.props.setAttributes( {
            selectedAuthor: parseInt( value ),
            authorName: authorName,
            authorDescription: authorDescription,
            authorLink: authorLink,
            profileTitle: authorName,
        } );
    }

    onSelectImage( value ) {
        //console.log( value );
        this.props.setAttributes({
            imgUrl: value.sizes.full.url,
        })
    }

    onChangeProfileTitle( newValue ) {
        this.props.setAttributes( { profileTitle: newValue } );
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


    render() {
        let options = [ { value: 0, label: __( 'Select an Author' ) } ];
        let output = 'Choose Author';

        this.props.className += ' loading';

        if( this.state.authors.length > 0 ) {
            this.state.authors.forEach( ( author ) => {
            options.push({ value:author.id, label:author.name });
        });

        } else {
            output = 'No authors found - please install MyBookTable or create author first.'
        }
        // Checking if we have anything in the object
        if( this.state.author !== undefined && this.state.author.hasOwnProperty('name')) {
            output = <div className="author">
            <a href={ this.state.author.link }>
                { this.state.author.name }
            </a>
            </div>;

            this.props.className += ' has-author';

        } else {
            this.props.className += ' no-author';
        }

		return (
            <div className={this.props.className }>

            <SelectControl
                onChange={this.onChangeSelectAuthor}
                value={ this.props.attributes.selectedAuthor }
                label={ __( 'Select an Author' ) }
                options={ options }
                className="author-select"
            />

            <div className="profile-preview">

            <h3 className="profile-title">
            <RichText
                tagName='span'
                placeholder= { this.props.attributes.authorName }
                className="buttons-label"
                value={ this.props.attributes.profileTitle }
                onChange={ this.onChangeProfileTitle }
                keepPlaceholderOnFocus={true}
                />
            </h3>
            <div className="inner is-flex">
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
            <div className="social-icons">
                <InnerBlocks allowedBlocks={['blueprint-blocks/social-link']} template={TEMPLATE} />
              </div>
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
        selectedAuthor: {
            type: 'number',
            default: null,
        },
        userName: {
            type: 'string',
        },
        userDescription: {
            type: 'string',
        },
        userLink: {
          type: 'string',
        },
        profileTitle: {
             type: 'string',
        },
        imgUrl: {
            type: 'string',
            default: 'http://placehold.it/500',
        }
	  },

	edit: myAuthorEdit,

	save: function( props ) {
		let imgUrl = props.attributes.imgUrl;
    let imgDefault = 'http://placehold.it/500';

    if( imgUrl === imgDefault ) {
      imgUrl = null;
    }

		return (
			<div className={ props.className }>

        <h3 className="profile-title">
            <span>{ props.attributes.profileTitle }</span>
        </h3>

        <div className="inner is-flex">

            <div className="profile-main">
            {
              imgUrl && (
                <div className="media">
                <img src={ props.attributes.imgUrl }
                className="profile-image"/>
                </div>
              )
            }

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
              <nav className="blueprint-social-wrap bpauthor-block-social">
                <ul className="blueprint-social">
                  <InnerBlocks.Content />
                </ul>
              </nav>
            </div>

        </div>
      </div>
		  );
	},
} );
