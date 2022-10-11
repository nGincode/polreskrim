<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GroupsUsers;
use App\Models\User;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class UsersApi extends Controller
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



        foreach (User::orderBy('id', 'DESC')->get() as $key => $value) {
            if ($action) {
                $data[] = [
                    'id' => $value['id'],
                    'username' => $value['username'],
                    'last_login_at' => date('d-M-Y H:i:s', strtotime($value['last_login_at'])),
                    'last_login_ip' => $value['last_login_ip'],
                    'email' => $value['email'],
                    'action' => $act ?? ''
                ];
            } else {
                $data[] = [
                    'id' => $value['id'],
                    'username' => $value['username'],
                    'last_login_at' => date('d-M-Y H:i:s', strtotime($value['last_login_at'])),
                    'last_login_ip' => $value['last_login_ip'],
                    'email' => $value['email'],
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
        $uniquegroups = $request->input('uniquegroups');

        if ($id) {
            $data = User::where('id', $id)->first();
            return response()->json(
                [
                    'response' => 'success',
                    'message' => $data ? 'ok' : 'Nothing',
                    'data' => $data
                ],
                200
            );
        } else if ($uniquegroups) {
            $data = [];
            foreach (User::with('GroupsUsers')->get() as $v) {
                if (!isset($v->GroupsUsers[0])) {
                    $data[] = $v;
                }
            }
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
            if (User::where('id', $id)->delete()) {

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
        $username = $request->input('usernameUpdate');
        $email = $request->input('emailUpdate');
        $password = $request->input('passwordUpdate');
        $confirm_password = $request->input('passwordUpdateNew_confirmation');
        $passwordNew = $request->input('passwordUpdateNew');

        $id = $request->input('id');

        if ($id && $username  && $email && $password && $confirm_password && $passwordNew) {
            $validator = Validator::make(
                $request->all(),
                [
                    'passwordUpdateNew' => ['required', 'confirmed', Rules\Password::defaults()]
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
                if ($dataUsers = User::where('id', $id)->first()) {
                    if (!User::where('username', $username)->count() || $dataUsers['username'] === $username) {
                        if (!User::where('email', $email)->count() || $dataUsers['email'] === $email) {
                            if (Hash::check($password, $dataUsers->password)) {

                                if (User::where('id', $id)->update([
                                    'username' => $username,
                                    'email' => $email,
                                    'password' => Hash::make($passwordNew)
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
                                        'message' =>  'Password old not correct'
                                    ],
                                    200
                                );
                            }
                        } else {
                            return response()->json(
                                [
                                    'response' => 'error',
                                    'message' =>  'Email already used'
                                ],
                                200
                            );
                        }
                    } else {
                        return response()->json(
                            [
                                'response' => 'error',
                                'message' =>  'Name already used'
                            ],
                            200
                        );
                    }
                } else {
                    return response()->json(
                        [
                            'response' => 'error',
                            'message' =>  'User ID Not Valid'
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


    public function create(Request $request)
    {
        $username = $request->input('username');
        $email = $request->input('email');
        $password = $request->input('password');
        $confirm_password = $request->input('password_confirmation');

        if ($username && $email && $password && $confirm_password) {
            $validator = Validator::make(
                $request->all(),
                [
                    'username' => 'required',
                    'email' => 'required',
                    'password' => ['required', 'confirmed', Rules\Password::defaults()]
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
                if (!User::where('username', $request->input('username'))->count()) {
                    if (!User::where('email', $request->input('email'))->count()) {

                        if (User::insert([
                            'username' => $request->input('username'),
                            'email' => $request->input('email'),
                            'password' => Hash::make($request->password),
                            'email_verified_at' => date('Y-m-d H:i:s')
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
                                'message' =>  'Email already used'
                            ],
                            200
                        );
                    }
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
