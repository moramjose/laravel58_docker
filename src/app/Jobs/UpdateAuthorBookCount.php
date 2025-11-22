<?php

namespace App\Jobs;

use App\Author;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class UpdateAuthorBookCount implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $authorId;

    public function __construct($authorId)
    {
        $this->authorId = $authorId;
    }

    public function handle()
    {
        $author = Author::find($this->authorId);

        if ($author) {
            $count = $author->books()->count();
            $author->books_count = $count;
            $author->save();
        }
    }
}