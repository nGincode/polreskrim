<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Employe;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class EmployeApi extends Controller
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



        foreach (Employe::where('delete', false)->with('Store')->orderBy('id', 'DESC')->get() as $key => $value) {

            if ($action) {
                $data[] = [
                    'id' => $value['id'],
                    'img' => $value['img'] ? "<img src='" . $value['img'] . "' width='50px' >" : "<img src='assets/unamaed/unnamed.png' width='50px' >",
                    'name' => $value['name'],
                    'entry' => date('d-M-Y', strtotime($value['date_of_entry'])),
                    'position' => $value['position'] . ' ' . $value['division'],
                    'whatsapp' => $value['whatsapp'],
                    'store' => $value['store'] ? (['id' => $value['store']->id, 'label' => $value['store']->name]) : null,
                    'action' => $act ?? ''
                ];
            } else {
                $data[] = [
                    'id' => $value['id'],
                    'img' => $value['img'] ? "<img src='" . $value['img'] . "' width='50px' >" : "<img src='assets/unamaed/unnamed.png' width='50px' >",
                    'name' => $value['name'],
                    'position' => $value['position'] . ' ' . $value['division'],
                    'whatsapp' => $value['whatsapp'],
                    'store' => $value['store'] ? (['id' => $value['store']->id, 'label' => $value['store']->name]) : null,
                    'entry' => date('d-M-Y', strtotime($value['date_of_entry'])),
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
        $users_id = $request->input('users_id');

        if ($id) {
            if ($value = Employe::where('id', $id)->with('Store', 'Users')->first()) {
                $data = [
                    'id' => $value['id'],
                    'name' => $value['name'],
                    'code ' => $value['code '],
                    'date_of_birth' => $value['date_of_birth'],
                    'date_of_entry' => $value['date_of_entry'],
                    'birth_of_place' => $value['birth_of_place'],
                    'religion' => $value['religion'],
                    'gender' => $value['gender'],
                    'address' => $value['address'],
                    'whatsapp' => $value['whatsapp'],
                    'position' => $value['position'],
                    'division' => $value['division'],
                    'delete' => $value['delete'],
                    'active' => $value['active'],
                    'img' => $value['img'],
                    'store' => $value['store'] ? (['id' => $value['store']->id, 'label' => $value['store']->name]) : null,
                    'users' => $value['users'] ? (['id' => $value['users']->id, 'label' => $value['users']->name]) : null,
                ];
            } else {
                $data = [];
            }

            return response()->json(
                [
                    'response' => 'success',
                    'message' => $data ? 'ok' : 'Nothing',
                    'data' => $data
                ],
                200
            );
        } else if ($users_id) {
            $data = Employe::where('users_id', $users_id)->first();
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
            if (Employe::where('id', $id)->update(['delete' => true])) {

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
        $date_of_birth = $request->input('date_of_birthUpdate');
        $birth_of_place = $request->input('birth_of_placeUpdate');
        $date_of_entry = $request->input('date_of_entryUpdate');
        $religion = $request->input('religionUpdate');
        $gender = $request->input('genderUpdate');
        $address = $request->input('addressUpdate');
        $whatsapp = $request->input('whatsappUpdate');
        $position = $request->input('positionUpdate');
        $division = $request->input('divisionUpdate');
        $active = $request->input('activeUpdate');

        $id = $request->input('id');

        if ($id && $name && $date_of_birth && $birth_of_place && $date_of_entry && $religion && $gender && $address && $whatsapp && $position && $division && $active) {

            if ($data = Employe::where('id', $id)->first()) {

                $validator = Validator::make(
                    $request->all(),
                    [
                        'img' => 'mimes:jpeg,jpg,png'
                    ]
                );

                if ($data['name'] == $name) {
                    $validateName = $name;
                } else {
                    $str = Employe::where('name', $name)->count();
                    if ($str) {
                        return response()->json(
                            [
                                'response' => 'error',
                                'message' =>  'Name already used'
                            ],
                            200
                        );
                    } else {
                        $validateName = $name;
                    }
                }

                if ($validateName) {
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
                            $files->move(public_path('uploads/employe'), $imageName);
                            $urlimg = '/uploads/employe/' . $imageName;
                        } else {
                            $urlimg = $data['img'];
                        }

                        if (Employe::where('id', $id)->update([
                            'name' => $name,
                            'date_of_birth' => $date_of_birth,
                            'birth_of_place' => $birth_of_place,
                            'date_of_entry' => $date_of_entry,
                            'religion' => $religion,
                            'gender' => $gender,
                            'address' => $address,
                            'whatsapp' => $whatsapp,
                            'position' => $position,
                            'division' => $division,
                            'active' => $active,
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
        $date_of_birth = $request->input('date_of_birth');
        $birth_of_place = $request->input('birth_of_place');
        $date_of_entry = $request->input('date_of_entry');
        $religion = $request->input('religion');
        $gender = $request->input('gender');
        $address = $request->input('address');
        $whatsapp = $request->input('whatsapp');
        $position = $request->input('position');
        $division = $request->input('division');
        $store = $request->input('store');
        $active = $request->input('active');

        if ($name && $date_of_birth && $birth_of_place && $date_of_entry && $religion && $gender && $address && $whatsapp && $position && $division && $store && $active) {

            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'date_of_birth' => 'required',
                    'birth_of_place' => 'required',
                    'date_of_entry' => 'required',
                    'religion' => 'required',
                    'gender' => 'required',
                    'address' => 'required',
                    'whatsapp' => 'required',
                    'position' => 'required',
                    'division' => 'required',
                    'store' => 'required',
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
                if (!Employe::where('name', $request->input('name'))->where('delete', false)->count()) {
                    if ($request->hasFile('img')) {
                        $files = $request->file('img');
                        $imageName = date('YmdHis') . '.' . $files->getClientOriginalExtension();
                        $files->move(public_path('uploads/employe'), $imageName);
                        $urlimg = '/uploads/employe/' . $imageName;
                    } else {
                        $urlimg = '';
                    }

                    if (Employe::insert([
                        'name' => $request->input('name'),
                        'date_of_birth' => $request->input('date_of_birth'),
                        'birth_of_place' => $request->input('birth_of_place'),
                        'date_of_entry' => $request->input('date_of_entry'),
                        'religion' => $request->input('religion'),
                        'gender' => $request->input('gender'),
                        'address' => $request->input('address'),
                        'whatsapp' => $request->input('whatsapp'),
                        'position' => $request->input('position'),
                        'division' => $request->input('division'),
                        'active' => $request->input('active'),
                        'store_id' => $request->input('store'),
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
