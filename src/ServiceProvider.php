<?php

namespace Maddlen\BarcodeScanner;

use Maddlen\BarcodeScanner\Fieldtypes\BarcodeScannerFieldtype;
use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $fieldtypes = [
        BarcodeScannerFieldtype::class
    ];

    protected $publishables = [
        __DIR__.'/../public' => ''
    ];

    protected $vite = [
        'input' => [
            'resources/js/cp.js',
        ],
        'publicDirectory' => 'resources/dist',
    ];

    public function bootAddon()
    {
        //
    }
}
