/**
 * BLOCK: container
 *
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Panel, PanelBody, PanelRow } = wp.components;
const { Component } = wp.element;
const { InspectorControls, PanelColorSettings, InnerBlocks } = wp.editor;

const TEMPLATE = [
	["core/heading", { content: "Your Title Goes Here...", level: "2" }, []],
	[
		"core/paragraph",
		{
			content:
				"Nullam quis risus eget urna mollis ornare vel eu leo. Etiam porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."
		},
		[]
	]
];

class blueprintContainer extends Component {
	constructor() {
		super(...arguments);

		this.getInspectorControls = this.getInspectorControls.bind(this);

		this.onChangeBGColor = this.onChangeBGColor.bind(this);
		this.onChangeTextColor = this.onChangeTextColor.bind(this);
	}

	getInspectorControls(options) {
		return (
			<InspectorControls>
				<PanelColorSettings
					title={__("Colors", "blueprint-blocks")}
					initialOpen={false}
					colorSettings={[
						{
							value: this.props.attributes.colorText,
							onChange: this.onChangeTextColor,
							label: __("Text Color", "blueprint-blocks")
						},
						{
							value: this.props.attributes.colorBG,
							onChange: this.onChangeBGColor,
							label: __("Background Color", "blueprint-blocks")
						}
					]}
				/>
			</InspectorControls>
		);
	}
	onChangeBGColor(colorBG) {
		this.props.setAttributes({ colorBG: colorBG });
		console.log(this.props.attributes.colorBG);
	}
	onChangeTextColor(colorText) {
		this.props.setAttributes({ colorText: colorText });
	}

	render() {
		let blockStyle = {};

		if (this.props.attributes.colorBG) {
			this.props.className += " has-background-color";
			blockStyle.backgroundColor = this.props.attributes.colorBG;
		}

		if (this.props.attributes.colorText) {
			blockStyle.color = this.props.attributes.colorText;
		}

		return (
			<div className={this.props.className} style={blockStyle}>
				<this.getInspectorControls />
				<div className="inner" style={blockStyle}>
					<InnerBlocks template={TEMPLATE} />
				</div>
			</div>
		);
	}
}

registerBlockType("blueprint-blocks/container", {
	title: __("Container"),
	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: "#fff",
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: "#49A5C3",
		// Specifying a dashicon for the block
		src: "archive"
	},
	category: "blueprint-blocks",
	keywords: [__("blueprint-blocks — container"), __("Container")],
	supports: {
		align: ["center", "wide", "full"],
		anchor: true
	},
	attributes: {
		anchor: {
			type: "string",
			source: "attribute",
			attribute: "id",
			selector: "*"
		},
		colorBG: {
			type: "string",
			default: "#fff"
		},
		colorText: {
			type: "string",
			default: ""
		}
	},

	edit: blueprintContainer,

	save: function(props) {
		let blockStyle = {};

		if (props.attributes.colorBG) {
			props.className += " has-background-color";
			blockStyle.backgroundColor = props.attributes.colorBG;
		}

		if (props.attributes.colorText) {
			blockStyle.color = props.attributes.colorText;
		}

		return (
			<div
				className={props.className}
				id={props.attributes.anchor}
				style={blockStyle}
			>
				<div className="inner" style={blockStyle}>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
});
