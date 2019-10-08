<?php

namespace Statamic\Addons\Delphineachard;

use Statamic\Extend\Tags;
use Statamic\API\Entry;


class DelphineachardTags extends Tags
{
    /**
     * The {{ delphineachard }} tag
     *
     * @return string|array
     */
    public function index()
    {
        //
    }

    /**
     * The {{ delphineachard:example }} tag
     *
     * @return string|array
     */
    public function nextAlbum()
    {

        $slug = $this->getParam('slug');
        $champ = $this->getParam('champ');

        $albums = Entry::whereCollection('albums')->sortBy(function($entry) {
            return $entry->order();
        })->values()->all();

        if(count($albums)) {
            if($next = DelphineachardTags::findNext($albums, $slug)) {
                if($champ) {
                    if($champ == 'url') {
                        return $next->url();
                    } else {
                        return $next->data()[$champ];
                    }
                }
            } else {
                if($this->getParam('debut')) {
                    return '<!--';
                } else if($this->getParam('fin')) {
                    return '-->';
                }
            }
        }
    }
    public static function findNext($albums, $slug) {
        $trouve=false;
        foreach($albums as $album) {
            if($trouve) {
                return $album;
            }
            if($album->slug() == $slug) {
                $trouve=true;
            }
        }
    }
}
