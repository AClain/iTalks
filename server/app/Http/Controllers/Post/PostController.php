<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\SearchController;
use App\Models\Category;
use App\Models\CategoryFollow;
use App\Models\Comment;
use App\Models\Notification;
use App\Models\NotificationTypes;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\PostResource;
use App\Models\Resource;
use App\Models\UserFollow;
use Illuminate\Http\Request;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

use App\Models\Status;
use App\Models\User;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function feed(Request $request)
    {

        $token = TokenController::parseToken($request->cookie('token'));

        $user = User::find($token['uid']);
        $posts = Post::query();

        $followedUsers = UserFollow::where('follower_id', $user->id)->first();

        if ($followedUsers) {
            $posts->where('user_id', $followedUsers->follower_id)->get();
        }

        return response()->json([
            'posts' => $posts
        ], 201);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function popular()
    {
        $posts = Post::all();

        return response()->json([
            'posts' => $posts,
        ], 201);
    }

    /**
     * Return the all posts for the given id
     *
     * @param int $id
     * @return Response
     */
    public function get($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Le post n\'a pas été trouvé.',
            ], 404);
        }

        return response()->json([
            'post' => $post,
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function storeSingle(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:100',
            'text' => 'required|max:1000',
            'category' => 'required|exists:categories,name'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $post = new Post();

        $token = TokenController::parseToken($request->cookie('token'));
        $status = Status::where('name', 'actif')->first();

        $post->title = trim(request('title'));
        $post->text = request('text');
        $post->user_id = $token["uid"];
        $post->status_id = $status->id;

        if ($post->save()) {

            $category = Category::where('name', request('category'))->first();

            PostCategory::create([
                'post_id' => $post->id,
                'category_id' => $category->id,
                'status_id' => $status->id,
            ]);


            $Notify_type = NotificationTypes::where('name', 'message')->first();
            $status = Status::where('name', 'non-lu')->first();

            $author = User::find($token["uid"]);

            foreach ($category->followers() as $follower) {
                Notification::create([
                    'user_id' => $follower->id,
                    'type_id' => $Notify_type->id,
                    'text' => "L'article " . "<a href=" . config('app.client_url') . "/post/" . $post->id . ">" . trim(request('title')) . "</a> de la catégorie <a href=" . config('app.client_url') . "/category/" . $category->name . ">" . $category->name . "</a>",
                    'status_id' => $status->id,
                ]);
            }


            foreach ($author->users_followed() as $follower) {
                Notification::create([
                    'user_id' => $follower->id,
                    'type_id' => $Notify_type->id,
                    'text' => "<a href=" . config('app.client_url') . "/user/" . $author->id . ">" . ucfirst($author->username) . "</a> viens de publié l\'article <a href=" . config('app.client_url') . "/post/" . $post->id . ">" . trim(request('title')) . "</a>",
                    'status_id' => $status->id,
                ]);
            }

            return response()->json([
                'message' => 'Le post a été créé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function storeSingleImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:100',
            'text' => 'required|max:1000',
            'category' => 'required|exists:categories,name'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        if ($request->hasFile('image')) {
            $file_extention = $request->file('image')->getClientOriginalExtension();
            if (!in_array($file_extention, ['jpeg', 'jpg', 'png', 'gif'])) {
                return response()->json([
                    'errors' => [
                        'image' => 'L\'extension du fichier n\'est pas accepté. (' . $file_extention . ')'
                    ]
                ], 400);
            }
        }

        $post = new Post();

        $token = TokenController::parseToken($request->cookie('token'));
        $status = Status::where('name', 'actif')->first();

        $post->title = trim(request('title'));
        $post->text = request('text');
        $post->user_id = $token["uid"];
        $post->status_id = $status->id;

        if ($post->save()) {
            if ($request->hasFile('image')) {
                $resource_id = $this->storeImage($request->file('image'), $post);

                PostResource::create([
                    'post_id' => $post->id,
                    'resource_id' => $resource_id,
                    'status_id' => $status->id,
                ]);
            }

            $category = Category::where('name', request('category'))->first();

            PostCategory::create([
                'post_id' => $post->id,
                'category_id' => $category->id,
                'status_id' => $status->id,
            ]);

            $Notify_type = NotificationTypes::where('name', 'message')->first();
            $status = Status::where('name', 'non-lu')->first();

            $author = User::find($token["uid"]);

            foreach ($category->followers() as $follower) {
                Notification::create([
                    'user_id' => $follower->id,
                    'type_id' => $Notify_type->id,
                    'text' => "L'article " . "<a href=" . config('app.client_url') . "/post/" . $post->id . ">" . trim(request('title')) . "</a> de la catégorie <a href=" . config('app.client_url') . "/category/" . $category->name . ">" . $category->name . "</a>",
                    'status_id' => $status->id,
                ]);
            }

            foreach ($author->users_followed() as $follower) {
                Notification::create([
                    'user_id' => $follower->id,
                    'type_id' => $Notify_type->id,
                    'text' => "<a href=" . config('app.client_url') . "/user/" . $author->id . ">" . ucfirst($author->username) . "</a> viens de publié l\'article <a href=" . config('app.client_url') . "/post/" . $post->id . ">" . trim(request('title')) . "</a>",
                    'status_id' => $status->id,
                ]);
            }

            return response()->json([
                'message' => 'Le post a été créé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function storeSingleVideo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:100',
            'category' => 'required|exists:categories,name'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        if ($request->hasFile('video')) {
            $file_extention = $request->file('video')->getClientOriginalExtension();
            if (!in_array($file_extention, ['mp4'])) {
                return response()->json([
                    'errors' => [
                        'video' => 'L\'extension du fichier n\'est pas accepté. (' . $file_extention . ')'
                    ]
                ], 400);
            }
        }

        $post = new Post();

        $token = TokenController::parseToken($request->cookie('token'));
        $status = Status::where('name', 'actif')->first();

        $post->title = trim(request('title'));
        $post->text = request('text');
        $post->user_id = $token["uid"];
        $post->status_id = $status->id;

        if ($post->save()) {
            if ($request->hasFile('video')) {
                $postResource = new PostResource();

                $resource_id = $this->storeVideo($request->file('video'), $post);
                $postResource->post_id = $post->id;
                $postResource->resource_id = $resource_id;
                $postResource->status_id = $status->id;
            }

            $category = Category::where('name', request('category'))->first();

            $postCategory = new PostCategory();
            $postCategory->post_id = $post->id;
            $postCategory->category_id = $category->id;
            $postCategory->status_id = $status->id;

            $saveCategory = $post->save();

            $Notify_type = NotificationTypes::where('name', 'message')->first();
            $status = Status::where('name', 'non-lu')->first();

            $followerCat = CategoryFollow::where('category_id', $category->id)->get();
            $followerUser = UserFollow::where('user_id', $token["uid"])->get();

            $authorPost = User::findOrFail($token["uid"]);

            foreach ($followerCat as $f) {
                Notification::create([
                    'user_id' => $f->follower_id,
                    'type_id' => $Notify_type->id,
                    'text' => 'L\'article "' . trim(request('title')) . '" de la catégorie "' . $category->name . '" viens être publié.',
                    'status_id' => $status->id,
                ]);
            }

            foreach ($followerUser as $f) {
                Notification::create([
                    'user_id' => $f->follower_id,
                    'type_id' => $Notify_type->id,
                    'text' => ucfirst($authorPost->username) . ' viens de publié l\'article "' . trim(request('title')) . '".',
                    'status_id' => $status->id,
                ]);
            }

            return response()->json([
                'message' => 'Le post a été créé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param $file
     * @param $post
     * @return Response
     */
    private function storeImage($file, $post)
    {
        $file_extention = $file->getClientOriginalExtension();
        $filename = 'image.' . $file_extention;
        $post =  Post::find($post->id);

        $base_path = public_path('/storage/images/posts/');

        $post_path = $base_path . $post->id;

        if (!File::isDirectory($post_path)) {
            File::makeDirectory($post_path, 0777, true, true);
        }

        $file->storeAs('posts/' . $post->id, 'image.' . $file_extention, 'local');

        $status = Status::where('name', 'actif')->first();

        $image = new Resource();
        $image->link = config('app.url') . config('app.port') . '/api/image/post/' . $post->id . '/' . $filename;
        $image->name = $filename;
        $image->status_id = $status->id;
        $image->save();

        return $image->id;
    }

    private function storeVideo($file, $post)
    {
        $file_extention = $file->getClientOriginalExtension();
        $filename = 'video.' . $file_extention;
        $post =  Post::find($post->id);

        $base_path = public_path('/storage/videos/posts/');

        $post_path = $base_path . $post->id;

        if (!File::isDirectory($post_path)) {
            File::makeDirectory($post_path, 0777, true, true);
        }

        $file->storeAs('posts/' . $post->id, 'video.' . $file_extention, 'local');

        $status = Status::where('name', 'actif')->first();

        $video = new Resource();
        $video->link = config('app.url') . config('app.port') . '/api/image/post/' . $post->id . '/' . $filename;
        $video->name = $filename;
        $video->status_id = $status->id;
        $video->save();

        return $video->id;
    }

    /**
     * Store - get all comment by id post
     *
     */
    public function getComments(int $id, Request $request)
    {

        $post = Post::find($id);

        $comments = new SearchController($request, Comment::query()->with('childrenComment'));

        $comments->addWhere('post_id', '=', $post->id)->addWhere('parent_id', '=');

        return response()->json([
            'comments' => $comments->getResults()
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:100',
            'text' => 'required|max:1000|',
            'category' => 'exists:categories,name'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $post = Post::find($id);
        if (!$post) {
            return response()->json([
                'message' => 'Le post n\'a pas été trouvé.',
            ], 404);
        }

        $token = TokenController::parseToken($request->cookie('token'));
        if ($token["uid"] !== $post->user_id) {
            return response()->json([
                'message' => 'Vous n\êtes pas authorisé à modifé cette resource.',
            ], 403);
        }

        $user = User::where('username', request('user'))->first();
        $category = Category::where('name', request('category'))->first();

        $post->title = request('title') ?? $post->title;
        $post->text = request('text') ?? $post->text;
        $post->user_id  = $user ? $user->id : $post->user_id;
        $post->category_id = $category ? $category->id : $post->category_id;
        $post->is_edited = true;

        if ($post->save()) {
            $post->user_id = User::select('id', 'username', 'role', 'status')->where('id', $user->id)->first();
            $post->status_id = Status::find($post->status_id);
            $post->category = Category::find($post->category_id);

            unset($post->user_id);
            unset($post->status_id);
            unset($post->category_id);

            return response()->json([
                'message' => 'Post mis à jour avec succès!',
                'post' => $post
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id, Request $request)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Le post n\'a pas été trouvé.'
            ], 404);
        }

        $token = TokenController::parseToken($request->cookie('token'));
        if ($token["uid"] !== $post->user_id) {
            return response()->json([
                'message' => 'Vous n\êtes pas authorisé à modifé cette resource.',
            ], 403);
        }

        if ($post->delete()) {
            $postResources = PostResource::where('post_id', $post->id)->get();

            foreach ($postResources as $resource) {
                $this->deletePostImage($resource);
                $resource->delete();
            }

            $postCategory = PostCategory::where('post_id', $post->id)->first();
            $postCategory->delete();

            return response()->json([
                'message' => 'Post supprimé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    private function deletePostImage($postResource)
    {
        $resource = Resource::find($postResource->resource_id);

        if ($resource && File::exists(public_path('/storage/videos/posts/' . $postResource->post_id . '/' . $resource->name))) {
            File::delete(public_path('/storage/videos/posts/' . $postResource->post_id . '/' . $resource->name));
            return $resource->delete();
        }

        return false;
    }

    public function search(Request $request)
    {
        $posts = Post::where("title", "LIKE", "%" . $request->search . "%")->where('status_id', 1);
        $users = User::where("username", "LIKE", "%" . $request->search . "%")->where('status_id', 1)->with('avatar');
        $categories = Category::where("name", "LIKE", "%" . $request->search . "%")->where('status_id', 1);

        $searchPost = new SearchController($request, $posts);
        $searchUser = new SearchController($request, $users);
        $searchCategory = new SearchController($request, $categories);

        return response()->json([
            "posts" => $searchPost->getResults(),
            "users" => $searchUser->getResults(),
            "categories" => $searchCategory->getResults(),
        ]);
    }
}