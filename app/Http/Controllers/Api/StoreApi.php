<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Store;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class StoreApi extends Controller
{

    public function all(Request $request)
    {
        $action = $request->input('Action');


        $data = [];


        if ($action) {
            $act = '
            <div class="dropdown ms-auto text-end">
                <a class="btn-link" data-bs-toggle="dropdown" aria-expanded="true"><svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000000" cx="5" cy="12" r="2"></circle><circle fill="#000000" cx="12" cy="12" r="2"></circle><circle fill="#000000" cx="19" cy="12" r="2"></circle></g></svg></a>
                                                            <div class="dropdown-menu dropdown-menu-end" data-popper-placement="bottom-end" data-popper-reference-hidden="" style="margin: 0px; position: absolute; inset: 0px auto auto 0px; transform: translate(-160px, 26.4px);">
            ';

            if (in_array('View', $action)) {
                $act .= '<a class="dropdown-item" id="view"  data-bs-toggle="modal"
                data-bs-target=".bd-modal-lg"><i class="fa fa-eye"></i>  View</a>';
            }

            if (in_array('Create', $action)) {
                $act .= '<a class="dropdown-item" id="create" data-bs-toggle="modal"
                data-bs-target=".bd-modal-lg" ><i class="fa fa-plus"></i> Create</a>';
            }

            if (in_array('Update', $action)) {
                $act .= '<a class="dropdown-item" id="update" data-bs-toggle="modal"
                data-bs-target=".bd-modal-lg"><i class="fa fa-pencil"></i>  Update</a>';
            }

            if (in_array('Delete', $action)) {
                $act .= '<a class="dropdown-item" id="delete" data-bs-toggle="modal"
                data-bs-target=".bd-modal-lg" ><i class="fa fa-trash"></i> Delete</a>';
            }
            $act .= '</div></div>';
        }



        foreach (Store::where('delete', false)->orderBy('id', 'DESC')->get() as $key => $value) {

            if ($action) {
                $data[] = [
                    'id' => $value['id'],
                    'img' => $value['img'] ? "<img src='" . $value['img'] . "' width='50px' >" : "<img src='assets/unamaed/unnamed.png' width='50px' >",
                    'name' => $value['name'],
                    'whatsapp' => $value['whatsapp'],
                    'status' => ($value['active'] === 1 ? '<div class="badge badge-success">Active</div>' : '<div class="badge badge-danger">Non Active</div>') . ' ' . ($value['tipe'] ? '<div class="badge badge-primary">' . $value['tipe'] . '</div>' : ''),
                    'action' => $act ?? ''
                ];
            } else {
                $data[] = [
                    'id' => $value['id'],
                    'name' => $value['name'],
                    'img' => $value['img'] ? "<img src='" . $value['img'] . "' width='50px' >" : "<img src='assets/unamaed/unnamed.png' width='50px' >",
                    'whatsapp' => $value['whatsapp'],
                    'status' => $value['active'] === true ? '<div class="badge badge-success">Active</div>' : '<div class="badge badge-danger">Non Active</div>'
                ];
            }
        }

        return response()->json(
            [
                'response' => 'success',
                'message' => $data ? 'ok' : 'Not Value',
                'data' => $data
            ],
            200
        );
    }

    public function view(Request $request)
    {
        $id = $request->input('id');

        if ($id) {
            $data = Store::where('id', $id)->first();
            return response()->json(
                [
                    'response' => 'success',
                    'message' => $data ? 'ok' : 'Nothing',
                    'data' => $data
                ],
                200
            );
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'message' => 'Request not valid'
                ],
                200
            );
        }
    }

    public function delete(Request $request)
    {
        $id = $request->input('id');

        if ($id) {
            if (Store::where('id', $id)->update(['delete' => true])) {

                return response()->json(
                    [
                        'response' => 'success',
                        'message' => 'Deleted successfully',
                    ],
                    200
                );
            } else {
                return response()->json(
                    [
                        'response' => 'error',
                        'message' =>  'Database trauble'
                    ],
                    200
                );
            }
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'message' => 'Request not valid'
                ],
                200
            );
        }
    }

    public function update(Request $request)
    {
        $name = $request->input('nameUpdate');
        $tipe = $request->input('tipeUpdate');
        $address = $request->input('addressUpdate');
        $whatsapp = $request->input('whatsappUpdate');
        $active = $request->input('statusUpdate');
        $id = $request->input('id');

        if ($id && $name  && $tipe && $address && $whatsapp) {

            if ($Store = Store::where('id', $id)->first()) {

                $validator = Validator::make(
                    $request->all(),
                    [
                        'img' => 'mimes:jpeg,jpg,png'
                    ]
                );

                if ($Store['name'] == $name) {
                    $usernameValidate = $name;
                } else {
                    $str = Store::where('name', $name)->count();
                    if ($str) {
                        return response()->json(
                            [
                                'response' => 'error',
                                'message' =>  'Name already used'
                            ],
                            200
                        );
                    } else {
                        $usernameValidate = $name;
                    }
                }

                if ($usernameValidate) {
                    if ($validator->fails()) {
                        foreach ($validator->errors()->all() as $message) {

                            return response()->json(
                                [
                                    'response' => 'error',
                                    'message' =>  $message
                                ],
                                200
                            );
                        }
                    } else {

                        if ($request->hasFile('img')) {
                            $files = $request->file('img');
                            $imageName = date('YmdHis')  . '.' . $files->getClientOriginalExtension();
                            $files->move(public_path('uploads/stores'), $imageName);
                            $urlimg = '/uploads/stores/' . $imageName;
                        } else {
                            $urlimg = $Store['img'];
                        }

                        if (store::where('id', $id)->update([
                            'name' => $name,
                            'active' => $active,
                            'tipe' => $tipe,
                            'address' => $address,
                            'whatsapp' => $whatsapp,
                            'img' => $urlimg
                        ])) {
                            return response()->json(
                                [
                                    'response' => 'success',
                                    'message' => 'Change was successful',
                                ],
                                200
                            );
                        } else {
                            return response()->json(
                                [
                                    'response' => 'error',
                                    'message' =>  'Database trauble'
                                ],
                                200
                            );
                        };
                    }
                }
            } else {
                return response()->json(
                    [
                        'response' => 'error',
                        'message' => 'Request not valid'
                    ],
                    200
                );
            }
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'message' => 'Request not valid'
                ],
                200
            );
        }
    }


    public function create(Request $request)
    {
        $name = $request->input('name');
        $tipe = $request->input('tipe');
        $address = $request->input('address');
        $whatsapp = $request->input('whatsapp');

        if ($name && $tipe && $address && $whatsapp) {
            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'status' => 'required',
                    'tipe' => 'required',
                    'address' => 'required',
                    'whatsapp' => 'required',
                    'img' => 'mimes:jpeg,jpg,png'
                ]
            );

            if ($validator->fails()) {
                foreach ($validator->errors()->all() as $message) {

                    return response()->json(
                        [
                            'response' => 'error',
                            'message' =>  $message
                        ],
                        200
                    );
                }
            } else {
                if (!Store::where('name', $request->input('name'))->where('delete', false)->count()) {
                    if ($request->hasFile('img')) {
                        $files = $request->file('img');
                        $imageName = date('YmdHis') . '.' . $files->getClientOriginalExtension();
                        $files->move(public_path('uploads/stores'), $imageName);
                        $urlimg = url('/') . '/uploads/stores/' . $imageName;
                    } else {
                        $urlimg = '';
                    }

                    if (store::insert([
                        'name' => $request->input('name'),
                        'active' => $request->input('status'),
                        'tipe' => $request->input('tipe'),
                        'address' => $request->input('address'),
                        'whatsapp' => $request->input('whatsapp'),
                        'img' => $urlimg
                    ])) {
                        return response()->json(
                            [
                                'response' => 'success',
                                'message' => 'Create successful',
                            ],
                            200
                        );
                    } else {
                        return response()->json(
                            [
                                'response' => 'error',
                                'message' =>  'Database trauble'
                            ],
                            200
                        );
                    };
                } else {
                    return response()->json(
                        [
                            'response' => 'error',
                            'message' =>  'Name already used'
                        ],
                        200
                    );
                }
            }
        } else {
            return response()->json(
                [
                    'response' => 'error',
                    'message' => 'Request not valid'
                ],
                200
            );
        }
    }
}
