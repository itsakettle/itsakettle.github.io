---
layout:     post
title:      "Cross-Validation Experiment"
permalink: "8"
subtitle:   
date:       2024-03-31
image: "assets/img/8/main.png"
published: true
tags: [ml]
code: https://github.com/itsakettle/blog-content/tree/main/8 
image_width: 40%
---

Cross-validation isn't estimating the error of the specific model we have trained. So says [Cross-Validation: what does it estimate and how well does it do it?](https://arxiv.org/abs/2104.00673) which is cited in the early chapters of [Causal Inference  and Discovery in Python](https://www.packtpub.com/product/causal-inference-and-discovery-in-python/9781804612989). 

Instead it is estimating the average error of the models created by the training procedure across all training datasets of the same size.

Let's call our training datasets `XY_i` where `i` runs from `1` up to `n`. This notation captures that training data has both independent (`X`) and dependent (`Y`) variables.

(This would be a nice time to be using something like Mathjax.)

Let `population_error_XY_i` be the population error of the model trained on the data `XY_i`. 

Call the average population error across all models `mean_population_error_XY`. In reality we never know the population error of a model but in this case we can calculate this since we are using a fabricated population dataset. 


Let the cross-validation estimate of a model trained on data `XY_i` be `cv_error_XY_i`.

The paper shows that `cv_error_XY_i` will be closer to `mean_population_error_XY` than to `population_error_XY_i` (they use mean squared error).

Let's see if we get a similar result. The paper focuses mostly on the linear case so it would be nice to look at something different like a non-linear relaionship here. 

Oh, since we've started comparing, it's worth calling out that this little experiment will be much much less thorough than the paper. 

## Fabricated data
Here's some code to create a simple dataset using polars. 

It has three independent variables (`x1`, `x2`, `x3`) from different distributions and a dependent variable which is a multiplicative combination of the these along with some noise `e`. A RELU function is added for some extra non-linearity. 

{% highlight python %}

def y_expr() -> pl.Expr:
    
    multiply_error_expr = (pl.col("x1") * pl.col("x2") * pl.col("x3")) + pl.col("e")
    relu_expr = pl.when(multiply_error_expr <0).then(pl.lit(0)).otherwise(multiply_error_expr)
    return relu_expr

def create_population(n: int = 10):
    data = {"x1": stats.expon.rvs(scale=10, size=n),
            "x2": stats.poisson.rvs(mu=10, size=n),
            "x3": stats.norm.rvs(loc=50, scale=5, size=n),
            "e": stats.norm.rvs(loc=0, scale=2000, size=n)
           }
    df = pl.DataFrame(data).lazy()
    df = df.with_columns(y_expr().alias("y"))
    df = df.drop("e")
    return df.collect()



{% endhighlight %}

## Modelling

Let's try to predict `y` from `x1`, `x2` and `x3` using a decision tree. We're not trying to train a good model, rather we are trying to understand the cross-validation eatimate of our models performance. This means we can arbitrarily pick the models parameters, in this case tree depth, and keep it fixed.    

The code below has functions to sample a single training dataset, fit a tree, compute the cross-validation estimate of error and calculate the population error. Mean squared error is used for error calculations.

There is a bit of a dance switching between polars and numpy arrays when passing data to scikit-learn. I think there is a better way to do this and I need to investigate that when I get a chance.  

{% highlight python %}
def polars_to_sklearn(df: pl.DataFrame):
    X = df.select([pl.all().exclude("y")]).to_numpy()
    Y = df.select(pl.col("y")).to_numpy()
    return X, Y

def fit_tree_on_sample_and_cv(df: pl.DataFrame, n_sample: int, max_depth: int, folds: int):
    df = df.sample(n=n_sample)
    X, Y = polars_to_sklearn(df)
    cv_error_estimate = tree_cv_estimate(X=X, Y=Y, max_depth=max_depth, folds=folds)
    new_tree = tree.DecisionTreeRegressor(max_depth=max_depth).fit(X, Y)
    return new_tree, cv_error_estimate

def tree_cv_estimate(X: np.ndarray, Y: np.ndarray, max_depth: int, folds: int):
    new_tree = tree.DecisionTreeRegressor(max_depth=max_depth)
    rmse_scorer = make_scorer(root_mean_squared_error)
    cv_score = cross_val_score(estimator=new_tree, X=X, y=Y, scoring=rmse_scorer, cv=folds)
    return np.mean(cv_score)

def tree_population_error(population_X: np.ndarray, population_Y: np.ndarray, fitted_tree: tree.DecisionTreeRegressor):
    predicted_Y = fitted_tree.predict(population_X).reshape(-1, 1)
    error = root_mean_squared_error(y_true=population_Y, y_pred=predicted_Y)
    return error
{% endhighlight%}

Since we are fabricating a population dataset of fixed size we can sample from it to get training datasets and then evaluate the performance of the trained model on the entire population. 

## The Experiment

Let's put it all together. We set the population size to 1,000,009 (yes 9...a typo but I'm sticking by it!). We build 1,000 trees each trained on a sample of 1,000 data points from the population dataset. 

The only parameter we set when building the tree is the max depth, arbitrarily choosing 10. It might overfit or it might not, that's not important for this experiment. 

We use 10 fold cross validation.

We also include a paired t-test to give a little comfort that there are enough trees. I think the assumptions of a paired t-test are met but I've tried not to over think that.

{% highlight python %}

def main(n_sample: int = 1000, n_trees: int = 1000,
         max_depth: int = 10, folds: int = 10):
    df = create_population(n=1000009)
    population_X, population_Y = polars_to_sklearn(df=df)
    
    population_errors = []
    cv_estimates = []
    
    for i in range(0, n_trees):
        fitted_tree, cv_estimate = fit_tree_on_sample_and_cv(df=df, n_sample=n_sample, max_depth=max_depth, folds=folds)
        error = tree_population_error(population_X=population_X,
                                  population_Y=population_Y,
                                  fitted_tree=fitted_tree)
        population_errors.append(error)
        cv_estimates.append(cv_estimate)

    df_results = pl.DataFrame({"population_error": population_errors, 
                               "cv_estimate": cv_estimates})

    df_results = df_results.with_columns(pl.mean("population_error").alias("mean_population_error"),
                            delta_cv_population_error_squared())\
                           .with_columns(delta_cv_mean_population_error_squared())

    paired_t_test_result = stats.ttest_rel(df_results.select("delta_cv_mean_population_error_squared").to_numpy(),
                                           df_results.select("delta_cv_population_error_squared").to_numpy(),
                                           alternative="less")

    df_results = df_results.select(pl.mean("delta_cv_mean_population_error_squared"),
                                   pl.mean("delta_cv_population_error_squared"),
                                   pl.lit(paired_t_test_result.pvalue).alias("paired_t_test_p_value"))

    return df_results



{% endhighlight %}

Here is `df_results`.

```
shape: (1, 3)
┌────────────────┬───────────────┬───────────────┐
│ delta_cv_mean_ ┆ delta_cv_popu ┆ paired_t_test │
│ population_err ┆ lation_error_ ┆ _p_value      │
│ or_squared     ┆ squared       ┆ ---           │
│ ---            ┆ ---           ┆ f64           │
│ f64            ┆ f64           ┆               │
╞════════════════╪═══════════════╪═══════════════╡
│ 18963.842164   ┆ 21313.904408  ┆ 0.002268      │
└────────────────┴───────────────┴───────────────┘
```

Hurray! The cross-validation estimate is closer to the mean of all the population errors and there is a very low p value from the t-test.  

I'd be curious to see what happens as we move towards leave-one-out cross validation but that's not for now.

_____
