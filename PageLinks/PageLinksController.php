<?php

namespace Statamic\Addons\PageLinks;

use Statamic\API\Asset;
use Statamic\API\Config;
use Statamic\API\Content;
use Statamic\API\Image;
use Statamic\API\Page;
use Statamic\API\Str;
use Statamic\Extend\Controller;
use Statamic\Http\Controllers\GlobalsController;
use Statamic\API\File;
use Statamic\API\Folder;
use Statamic\API\Path;
use Statamic\Contracts\Data\Content\Content as DataContent;
use Statamic\Exceptions\InvalidEntryTypeException;
use Statamic\Extend\API;

class PageLinksController extends Controller
{
    /**
     * Maps to your route definition in routes.yaml
     *
     * @return Illuminate\Http\Response
     */
    public function index()
    {
        return null;
    }

    public function getLocales() {
        return array_values(Config::get('system.locales'));
    }

    public function getPages() {
        $content = Content::all();

        $content = $content->filter(function (DataContent $entry) {
            /**
             * if it's not a page and has no URI (i.e. a collection item without a route) then skip it
             * need to check for instanceof Page because Homepage doesn't have an URI either
             */
            if($entry instanceof Page || $entry->uri() != false) {
                return true;
            }
            else {
                return false;
            }
        })->map(function (DataContent $entry) {
            $localizedUrls = null;
            $url = $entry->absoluteUrl();

            $locale = $GLOBALS['locale'];

            $name = null;
            if($entry->locale($locale)) {
                $name = $entry->get("title", $entry);
            }
            else {
                $name = $entry->get("title");
            }

            $name = $name . " (".$url.")";

            $segmentCount = substr_count($url, "/");

            return [
                'name' => $name,
                'url' => "{{ pages id='".$entry->id()."' }}{{ url }}{{ /pages }}",
                'slug' => $url,
                'depth' => $segmentCount
            ];
        })->sort(function ($a, $b) {
            return strnatcasecmp($a['slug'], $b['slug']);
        });

        $content = $content->toArray();
        array_unshift($content, [
            'name' => "Please Select",
            'url' => ""
        ]);

        return $content;
    }

    function startsWith($haystack, $needle)
    {
        $length = strlen($needle);
        return (substr($haystack, 0, $length) === $needle);
    }
}
