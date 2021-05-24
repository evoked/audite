import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const YouTubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
    <p></p>
    {console.log(`embed ${embedId}`)}
    <Link to={{pathname: `https://www.youtube.com/watch?v=${embedId}`}} target="_blank">YouTube URL</Link>
  </div>
);

YouTubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YouTubeEmbed;