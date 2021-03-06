<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/*
 * InvoicePlane
 * 
 * A free and open source web based invoicing system
 *
 * @package		InvoicePlane
 * @author		Kovah (www.kovah.de)
 * @copyright	Copyright (c) 2012 - 2015 InvoicePlane.com
 * @license		https://invoiceplane.com/license.txt
 * @link		https://invoiceplane.com
 * 
 */

function pager($base_url, $model)
{
    $CI = &get_instance();

    $pager = '<div class="btn-group">';

    if (($previous_page = $CI->$model->previous_offset) >= 0) {
        $pager .= '<a class="btn btn-default btn-sm" href="' . $base_url . '/0" title="หน้าแรก"><i class="fa fa-fast-backward no-margin"></i></a>';
        $pager .= '<a class="btn btn-default btn-sm" href="' . $base_url . '/' . $CI->$model->previous_offset . '" title="ก่อนหน้า"><i class="fa fa-backward no-margin"></i></a>';
    } 
    else {
        $pager .= '<a class="btn btn-default btn-sm disabled" href="#" title="หน้าแรก"><i class="fa fa-fast-backward no-margin"></i></a>';
        $pager .= '<a class="btn btn-default btn-sm disabled" href="#" title="ก่อนหน้า"><i class="fa fa-backward no-margin"></i></a>';
    }

    if (($next_page = $CI->$model->next_offset) <= $CI->$model->last_offset) {
        $pager .= '<a class="btn btn-default btn-sm" href="' . $base_url . '/' . $CI->$model->next_offset . '" title="ถัด​ไป"><i class="fa fa-forward no-margin"></i></a>';
        $pager .= '<a class="btn btn-default btn-sm" href="' . $base_url . '/' . $CI->$model->last_offset . '" title="ล่าสุด"><i class="fa fa-fast-forward no-margin"></i></a>';
    } 
    else {
        $pager .= '<a class="btn btn-default disabled btn-sm" href="#" title="ถัด​ไป"><i class="fa fa-forward no-margin"></i></a>';
        $pager .= '<a class="btn btn-default disabled btn-sm" href="#" title="ล่าสุด"><i class="fa fa-fast-forward no-margin"></i></a>';
    }

    $pager .= '</div>';

    return $pager;

}
